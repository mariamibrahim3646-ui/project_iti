import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import AdminLayout from './AdminLayout';

export default function AdminOrders() {
  const { theme: t } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  // جلب الطلبات الفعلية من localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    setOrders(savedOrders);
  }, []);

  const getBadgeStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'PROCESSING': return { bg: t.isDark ? '#4a2520' : '#fde8e2', color: t.accent };
      case 'SHIPPED': return { bg: t.isDark ? '#1e293b' : '#e0f2fe', color: '#0284c7' };
      case 'DELIVERED': return { bg: t.isDark ? '#14532d' : '#dcfce7', color: '#15803d' };
      default: return { bg: t.surface, color: t.textMuted };
    }
  };

  const filteredOrders = orders.filter(o =>
    (o.customer || 'User').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(o.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', margin: 0 }}>Orders ({orders.length})</h1>
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 16px', borderRadius: '12px', border: `1px solid ${t.border}`,
            background: t.surface, color: t.text, width: '240px', outline: 'none'
          }}
        />
      </div>

      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '24px' }}>
        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: 'center', color: t.textMuted, margin: '20px 0' }}>No orders found in local storage.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.border}`, fontSize: '11px', color: t.textMuted, letterSpacing: '0.08em' }}>
                <th style={{ padding: '12px 8px' }}>ORDER ID</th>
                <th style={{ padding: '12px 8px' }}>DATE</th>
                <th style={{ padding: '12px 8px' }}>ITEMS</th>
                <th style={{ padding: '12px 8px' }}>TOTAL</th>
                <th style={{ padding: '12px 8px' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => {
                const badge = getBadgeStyle(ord.status || 'PROCESSING');
                const itemsCount = ord.items ? ord.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
                
                return (
                  <tr key={ord.id} style={{ borderBottom: `1px solid ${t.border}`, fontSize: '13px' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '700' }}>#{ord.id}</td>
                    <td style={{ padding: '12px 8px', color: t.textMuted }}>{ord.date || 'Recent'}</td>
                    <td style={{ padding: '12px 8px' }}>{itemsCount} item(s)</td>
                    <td style={{ padding: '12px 8px', fontWeight: '600' }}>${ord.total}</td>
                    <td style={{ padding: '12px 8px' }}>
                      <span style={{ fontSize: '10px', letterSpacing: '0.05em', fontWeight: '700', padding: '4px 10px', borderRadius: '12px', background: badge.bg, color: badge.color }}>
                        {ord.status || 'PROCESSING'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}