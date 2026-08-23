import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useFavorites } from '../FavoritesContext';
import { useCart } from '../CartContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetail({ isLoggedIn: propLoggedIn }) {
  // التحقق من حالة المستخدم (مع مراعاة الـ Guest)
  const savedRole = localStorage.getItem('userRole');
  const isGuestRole = savedRole === 'guest';
  const isLoggedIn = propLoggedIn || (!!localStorage.getItem('userEmail') && !isGuestRole);

  const { id } = useParams();
  const { theme: t } = useTheme();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => String(p.id) === String(id)) || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  const favStatus = isFavorite(product.id);
  const relatedProducts = PRODUCTS.filter((p) => String(p.id) !== String(product.id)).slice(0, 3);

  // منع إضافة السلة للـ Guest
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginNotice(true);
      setTimeout(() => setShowLoginNotice(false), 3500);
      return;
    }

    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // منع إضافة المفضلة للـ Guest
  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      setShowLoginNotice(true);
      setTimeout(() => setShowLoginNotice(false), 3500);
      return;
    }

    toggleFavorite(product);
  };

  // ... باقي كود المكون يظل كما هو

  return (
    <div style={{ background: t.bg, minHeight: '100vh', paddingBottom: '80px', transition: 'background 0.3s' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '13px',
          color: t.textMuted
        }}>
          <Link to="/" style={{ color: t.textMuted, textDecoration: 'none' }}>Home</Link>
          <span>·</span>
          <Link to="/shop" style={{ color: t.textMuted, textDecoration: 'none' }}>Shop</Link>
          <span>·</span>
          <span style={{ color: t.text, fontWeight: '500' }}>{product.name}</span>
        </div>
      </div>

      {/* Main Layout Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 24px 60px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '48px',
        alignItems: 'start'
      }}>
        
        {/* Left: Product Image Display */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1.05',
          borderRadius: '20px',
          overflow: 'hidden',
          background: t.surface,
          border: `1px solid ${t.border}`,
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          <button
            onClick={handleToggleFavorite}
            title={favStatus ? "Remove from favorites" : "Add to favorites"}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={favStatus ? "#E53E3E" : "none"} stroke={favStatus ? "#E53E3E" : t.text} strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        {/* Right: Product Details & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: t.textMuted,
              background: t.bgAlt,
              padding: '4px 10px',
              borderRadius: '8px',
              border: `1px solid ${t.border}`
            }}>
              {product.category}
            </span>

            {product.badge && (
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                background: product.badgeBg || t.accent,
                padding: '4px 10px',
                borderRadius: '8px'
              }}>
                {product.badge}
              </span>
            )}
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: '400',
            color: t.text,
            margin: '0 0 8px',
            lineHeight: '1.2'
          }}>
            {product.name}
          </h1>

          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
            color: t.textMuted,
            margin: '0 0 20px'
          }}>
            {product.subtext}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '18px' }}>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '32px',
              color: t.accent,
              fontWeight: '500'
            }}>
              ${product.price}
            </span>
            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
              color: t.textMuted
            }}>
              {product.size}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
            <div style={{ color: '#D97706', fontSize: '14px', letterSpacing: '2px' }}>★★★★★</div>
            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
              color: t.textMuted
            }}>
              {product.rating} · {product.reviewsCount} reviews
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${t.border}`,
              borderRadius: '24px',
              background: t.surface,
              padding: '4px 12px'
            }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: t.text,
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                -
              </button>
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                color: t.text,
                padding: '0 12px'
              }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: t.text,
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: '14px 24px',
                borderRadius: '28px',
                border: 'none',
                background: isAdded ? '#286f2b' : (t.accent || '#c97060'),
                color: '#ffffff',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
              }}
            >
              {isAdded ? '✓ ADDED TO BAG' : `ADD TO CART (${quantity})`}
            </button>

            <button
              onClick={handleToggleFavorite}
              title={favStatus ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: `1px solid ${favStatus ? '#E53E3E' : t.border}`,
                background: favStatus ? '#FFF5F5' : t.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={favStatus ? "#E53E3E" : "none"} stroke={favStatus ? "#E53E3E" : t.text} strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* تنبيه تسجيل الدخول */}
          {showLoginNotice && (
            <p style={{
              margin: '0 0 20px 0',
              fontSize: '12px',
              color: '#E53E3E',
              fontFamily: 'Outfit, sans-serif',
              textAlign: 'center'
            }}>
              Please <Link to="/login" style={{ color: t.text, fontWeight: 'bold' }}>Log in</Link> first to add items or save favorites.
            </p>
          )}

          <div style={{
            background: t.bgAlt,
            border: `1px solid ${t.border}`,
            borderRadius: '16px',
            padding: '14px 18px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
            color: t.textMuted
          }}>
            <span style={{ fontSize: '16px' }}>🌱</span>
            <span>Free shipping over $75 · Recycled packaging · Carbon neutral</span>
          </div>

          <div style={{ borderBottom: `1px solid ${t.border}`, marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '28px' }}>
              {['description', 'ingredients', 'howToUse'].map((tabKey) => {
                const labels = {
                  description: 'DESCRIPTION',
                  ingredients: 'INGREDIENTS',
                  howToUse: 'HOW TO USE'
                };
                const isActive = activeTab === tabKey;

                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: isActive ? `2px solid ${t.accent}` : '2px solid transparent',
                      paddingBottom: '10px',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '12px',
                      letterSpacing: '0.12em',
                      fontWeight: isActive ? '600' : '400',
                      color: isActive ? t.text : t.textMuted,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {labels[tabKey]}
                  </button>
                );
              })}
            </div>
          </div>

          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
            lineHeight: '1.7',
            color: t.textMuted,
            margin: 0,
            minHeight: '80px'
          }}>
            {product[activeTab]}
          </p>

        </div>
      </div>

      {/* You Might Also Like */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0', padding: '0 24px' }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '24px',
          fontWeight: '400',
          color: t.text,
          marginBottom: '28px',
          borderTop: `1px solid ${t.border}`,
          paddingTop: '40px'
        }}>
          You Might Also Like
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '32px'
        }}>
          {relatedProducts.map((relProduct) => (
            <ProductCard key={relProduct.id} product={relProduct} theme={t} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </div>

    </div>
  );
}