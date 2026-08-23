import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { useFavorites } from '../FavoritesContext';
import { useCart } from '../CartContext';

export default function Navbar({ user = null, onLogout }) {
  const { theme: t, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { openCart, cartCount } = useCart();
  const location = useLocation();
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const isGuest = user?.role === 'guest';
  const isLoggedIn = !!user && !isGuest;

  const navLinks = isAdmin
    ? [
        { name: 'DASHBOARD', path: '/admin' },
        { name: 'PRODUCTS', path: '/admin/products' },
        { name: 'ORDERS', path: '/admin/orders' },
      ]
    : [
        { name: 'HOME', path: '/' },
        { name: 'SHOP', path: '/shop' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' },
      ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: t.navBg || t.bg,
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${t.border}`,
      transition: 'all 0.3s ease',
    }}>
      {/* تضمين استعلامات الميديا للتحكم بالظهور على الموبايل */}
      <style>{`
        .desktop-nav {
          display: flex;
          gap: 32px;
        }
        .mobile-toggle-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* اللوجو وزر الهامبرغر للموبايل */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* زر قائمة الموبايل */}
          <button
            onClick={toggleMenu}
            className="mobile-toggle-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: t.text,
              padding: '4px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>

          <Link to="/" onClick={closeMenu} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '28px',
            fontStyle: 'italic',
            fontWeight: '500',
            color: t.text,
            textDecoration: 'none',
          }}>
            Serene
          </Link>
          
          {isAdmin && (
            <span style={{
              background: t.accent || '#c97060',
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '10px',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '6px',
              letterSpacing: '0.1em'
            }}>
              ADMIN
            </span>
          )}
        </div>

        {/* روابط التنقل للشاشات الكبيرة */}
        <nav className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.15em',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? t.text : t.textMuted,
                  textDecoration: 'none',
                  borderBottom: isActive ? `2px solid ${t.accent}` : '2px solid transparent',
                  paddingBottom: '4px',
                  transition: 'all 0.2s ease',
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* الأدوات والأزرار */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* زر الثيم */}
          <button
            onClick={toggleTheme}
            title="Theme toggle"
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {t.isDark ? '☀️' : '🌙'}
          </button>

          {!isAdmin && (
            <>
              {/* المفضلة */}
              <Link
                to="/favorites"
                onClick={closeMenu}
                style={{ position: 'relative', color: t.text, padding: '6px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {favorites.length > 0 && (
                  <span style={{
                    position: 'absolute', top: '2px', right: '0px', background: '#E53E3E',
                    color: '#fff', fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* السلة */}
              <button
                onClick={() => { openCart(); closeMenu(); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.text, padding: '6px', position: 'relative' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '2px', right: '0px', background: t.accent || '#c97060',
                    color: '#fff', fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </>
          )}

          {/* البروفايل أو زر التسجيل */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                to={isAdmin ? "/admin" : "/profile"}
                onClick={closeMenu}
                title="Profile"
                style={{
                  background: t.surface, border: `1px solid ${t.border}`, borderRadius: '50%',
                  width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.text, textDecoration: 'none'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>

              {isAdmin && (
                <button
                  onClick={() => { onLogout(); closeMenu(); }}
                  style={{
                    background: 'none', border: `1px solid ${t.border}`, color: t.text,
                    borderRadius: '16px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              onMouseEnter={() => setIsHoveredLogin(true)}
              onMouseLeave={() => setIsHoveredLogin(false)}
              style={{
                background: isHoveredLogin ? (t.accentDark || t.accent) : t.accent,
                color: t.accentFg || '#fff', border: 'none', borderRadius: '20px',
                padding: '8px 22px', fontFamily: 'Outfit, sans-serif', fontSize: '13px',
                fontWeight: '500', cursor: 'pointer', textDecoration: 'none'
              }}
            >
              Log in
            </Link>
          )}

        </div>
      </div>

      {/* القائمة المنبثقة للشاشات الصغيرة */}
      {isMenuOpen && (
        <div style={{
          background: t.surface || t.bg,
          borderBottom: `1px solid ${t.border}`,
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '14px',
                  letterSpacing: '0.12em',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? t.accent : t.text,
                  textDecoration: 'none',
                  padding: '8px 0',
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}