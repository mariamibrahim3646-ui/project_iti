import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../ThemeContext';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['ALL', 'SERUMS & OILS', 'MOISTURIZERS', 'CLEANSERS', 'TONERS', 'MASKS', 'SUNSCREEN'];

export default function Shop() {
  const { theme: t } = useTheme();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');

  // جلب المنتجات المحدثة من localStorage
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('adminProducts');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(INITIAL_PRODUCTS);
    }
  }, []);

  // الفلترة بناءً على قائمة المنتجات الحية
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'ALL') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, activeCategory, sortBy]);

  return (
    <div style={{ background: t.bg, minHeight: '100vh', transition: 'background 0.3s' }}>
      {/* Header Banner */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 40px' }}>
        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: t.accent,
          marginBottom: '12px'
        }}>
          SUMMER 2026
        </p>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 400,
          color: t.text,
          margin: '0 0 16px'
        }}>
          The Collection
        </h1>
        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '15px',
          color: t.textMuted,
          maxWidth: '520px',
          lineHeight: '1.7',
          margin: 0
        }}>
          Botanical formulas for daily calm. Each piece chosen for what it does, not how it looks on a shelf.
        </p>
      </div>

      {/* Filter & Sort Bar */}
      <div style={{
        position: 'sticky',
        top: '65px',
        zIndex: 900,
        borderTop: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        background: t.bgAlt
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeCategory === cat ? `2px solid ${t.accent}` : '2px solid transparent',
                  paddingBottom: '4px',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  fontWeight: activeCategory === cat ? '600' : '400',
                  color: activeCategory === cat ? t.text : t.textMuted,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: t.surface,
              color: t.text,
              border: `1px solid ${t.border}`,
              borderRadius: '20px',
              padding: '6px 16px',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="featured">Featured</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '13px',
          color: t.textMuted,
          marginBottom: '24px'
        }}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '32px'
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} theme={t} />
          ))}
        </div>
      </div>
    </div>
  );
}