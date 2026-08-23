import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function AdminLayout({ children }) {
  const { theme: t } = useTheme();
  const location = useLocation();

  const menuItems = [
    { label: '◇ Overview', path: '/admin' },
    { label: '◇ Products', path: '/admin/products' },
    { label: '▢ Orders', path: '/admin/orders' },
  ];

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: 'calc(100vh - 70px)', transition: 'all 0.3s ease' }}>
      <div style={{ display: 'flex', maxWidth: '1280px', margin: '0 auto', padding: '40px 20px', gap: '40px' }}>
        
        {/* الـ Sidebar الفرعي */}
        <aside style={{ width: '200px', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    textAlign: 'left',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    background: isActive ? t.surface : 'transparent',
                    color: isActive ? (t.accentDark || t.accent) : t.textMuted,
                    fontWeight: isActive ? '700' : '500',
                    fontSize: '14px',
                    textDecoration: 'none',
                    transition: '0.2s',
                    display: 'block'
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: `1px solid ${t.border}` }}>
            <Link to="/" style={{ textDecoration: 'none', color: t.textMuted, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ← Back to site
            </Link>
          </div>
        </aside>

        {/* محتوى الصفحة الحالية */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

      </div>
    </div>
  );
}