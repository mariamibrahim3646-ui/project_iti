import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function Footer() {
  const themeContext = useTheme();
  const t = themeContext?.theme || {};

  return (
    <footer
      style={{
        background: t.bgDark || '#2d1612',
        color: '#fdf0ec',
        padding: '60px 24px 30px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Brand Section */}
        <div style={{ minWidth: '220px' }}>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '26px',
              fontStyle: 'italic',
              margin: '0 0 16px',
              color: '#fdf0ec',
            }}
          >
            Serene
          </h2>
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
              lineHeight: '1.6',
              color: 'rgba(253, 240, 236, 0.65)',
              maxWidth: '260px',
              margin: 0,
            }}
          >
            Botanical skincare and home rituals for a quieter, more intentional life.
          </p>
        </div>

        {/* SHOP Column */}
        <div>
          <h4 style={headingStyle}>SHOP</h4>
          <ul style={listStyle}>
            <li><Link to="/shop" style={linkStyle}>Face</Link></li>
            <li><Link to="/shop" style={linkStyle}>Hair</Link></li>
            <li><Link to="/shop" style={linkStyle}>Home</Link></li>
            <li><Link to="/shop" style={linkStyle}>Gift Sets</Link></li>
          </ul>
        </div>

        {/* COMPANY Column */}
        <div>
          <h4 style={headingStyle}>COMPANY</h4>
          <ul style={listStyle}>
            <li><Link to="/about" style={linkStyle}>About</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
            <li><a href="#sustainability" style={linkStyle}>Sustainability</a></li>
            <li><a href="#careers" style={linkStyle}>Careers</a></li>
          </ul>
        </div>

        {/* SUPPORT Column */}
        <div>
          <h4 style={headingStyle}>SUPPORT</h4>
          <ul style={listStyle}>
            <li><a href="#shipping" style={linkStyle}>Shipping</a></li>
            <li><a href="#returns" style={linkStyle}>Returns</a></li>
            <li><a href="#faq" style={linkStyle}>FAQ</a></li>
            <li><a href="#privacy" style={linkStyle}>Privacy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: 'rgba(253, 240, 236, 0.45)',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        <span>© 2026 Serene. All rights reserved.</span>
        <div>
          <a href="#privacy" style={bottomLinkStyle}>Privacy</a>
          <span style={{ margin: '0 6px' }}>·</span>
          <a href="#terms" style={bottomLinkStyle}>Terms</a>
          <span style={{ margin: '0 6px' }}>·</span>
          <a href="#cookies" style={bottomLinkStyle}>Cookies</a>
        </div>
      </div>
    </footer>
  );
}

const headingStyle = {
  fontFamily: 'Outfit, sans-serif',
  fontSize: '12px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  margin: '0 0 20px',
  color: '#fdf0ec',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  lineHeight: '2.2',
  fontSize: '13px',
  fontFamily: 'Outfit, sans-serif',
};

const linkStyle = {
  color: 'rgba(253, 240, 236, 0.65)',
  textDecoration: 'none',
};

const bottomLinkStyle = {
  color: 'rgba(253, 240, 236, 0.45)',
  textDecoration: 'none',
};