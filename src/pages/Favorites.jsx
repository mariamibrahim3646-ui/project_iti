import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useFavorites } from '../FavoritesContext';
import ProductCard from '../components/ProductCard';

export default function Favorites({ isLoggedIn: propLoggedIn }) {
  const isLoggedIn = propLoggedIn || !!localStorage.getItem('userEmail');
  const { theme: t } = useTheme();
  const { favorites } = useFavorites();

  return (
    <div style={{ background: t.bg, minHeight: '80vh', padding: '40px 24px', transition: 'background 0.3s' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '36px',
          fontWeight: '400',
          color: t.text,
          marginBottom: '24px'
        }}>
          My Favorites ({favorites.length})
        </h1>

        {!isLoggedIn ? (
          <div style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: '16px',
            padding: '32px 24px',
            textAlign: 'center',
            maxWidth: '480px',
            margin: '40px auto'
          }}>
            <p style={{ fontFamily: 'Outfit, sans-serif', color: t.textMuted, fontSize: '15px', marginBottom: '20px' }}>
              Please log in to view and save your favorite products.
            </p>
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                background: t.accent || '#c97060',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: '20px',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              Log in Now
            </Link>
          </div>
        ) : favorites.length === 0 ? (
          <p style={{ fontFamily: 'Outfit, sans-serif', color: t.textMuted, fontSize: '15px' }}>
            No favorite items added yet.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '32px'
          }}>
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} theme={t} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}