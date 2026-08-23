import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFavorites } from '../FavoritesContext';
import { useCart } from '../CartContext';

export default function ProductCard({ product, theme: t, isLoggedIn: propLoggedIn }) {
  const isLoggedIn = propLoggedIn || !!localStorage.getItem('userEmail');
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  const favStatus = isFavorite(product?.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowLoginNotice(true);
      setTimeout(() => setShowLoginNotice(false), 3000);
      return;
    }

    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowLoginNotice(true);
      setTimeout(() => setShowLoginNotice(false), 3000);
      return;
    }

    toggleFavorite(product);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1.1',
        borderRadius: '16px',
        overflow: 'hidden',
        background: t.surface,
        border: `1px solid ${t.border}`,
        marginBottom: '16px'
      }}>
        {product.badge && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: product.badgeBg || t.accent,
            color: '#fff',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            padding: '4px 10px',
            borderRadius: '12px',
            zIndex: 2
          }}>
            {product.badge}
          </span>
        )}

        {/* زر المفضلة */}
        <button
          onClick={handleToggleFav}
          title={favStatus ? "Remove from favorites" : "Add to favorites"}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 4,
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={favStatus ? "#E53E3E" : "none"} stroke={favStatus ? "#E53E3E" : t.text} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* صورة المنتج */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)'
          }}
        />

        {/* رسالة تنبيه للـ Guest */}
        {showLoginNotice && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0, 0, 0, 0.85)',
              color: '#fff',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '11px',
              textAlign: 'center',
              zIndex: 10,
              backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              width: '80%'
            }}
          >
            Please <Link to="/login" style={{ color: t.accent || '#ffb7a8', fontWeight: 'bold' }}>Log in</Link> first!
          </div>
        )}

        {/* زر الإضافة للسلة */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          opacity: isHovered || isAdded ? 1 : 0,
          transform: isHovered || isAdded ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.3s ease',
          zIndex: 3
        }}>
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '24px',
              border: 'none',
              background: isAdded ? '#286f2b' : t.accent,
              color: '#ffffff',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
              transition: 'all 0.3s ease'
            }}
          >
            {isAdded ? '✓ ADDED' : 'ADD TO CART'}
          </button>
        </div>
      </div>

      <h3 style={{
        margin: '0 0 4px',
        fontFamily: 'Playfair Display, serif',
        fontSize: '18px',
        fontWeight: '400',
        color: t.text
      }}>
        {product.name}
      </h3>
      <p style={{
        margin: '0 0 8px',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '12px',
        color: t.textMuted
      }}>
        {product.subtext}
      </p>
      <p style={{
        margin: 0,
        fontFamily: 'Outfit, sans-serif',
        fontSize: '15px',
        fontWeight: '600',
        color: t.accent
      }}>
        ${product.price}
      </p>
    </div>
  );
}