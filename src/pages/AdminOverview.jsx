import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import AdminLayout from './AdminLayout';

export default function AdminOverview() {
  const { theme: t } = useTheme();

  const recentOrders = [
    { id: '#SE-4901', customer: 'Saoirse M.', date: 'Aug 14, 2026', items: 'Jojoba Face Oil × 2', total: '$96', status: 'PROCESSING' },
    { id: '#SE-4900', customer: 'Tariq A.', date: 'Aug 13, 2026', items: 'Reed Diffuser', total: '$42', status: 'SHIPPED' },
    { id: '#SE-4899', customer: 'Yuki T.', date: 'Aug 13, 2026', items: 'Marble Ritual Set', total: '$112', status: 'DELIVERED' },
    { id: '#SE-4898', customer: 'Noa F.', date: 'Aug 12, 2026', items: 'Calm Gift Set × 1', total: '$98', status: 'DELIVERED' },
  ];

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'PROCESSING': return { bg: t.isDark ? '#4a2520' : '#fde8e2', color: t.accent };
      case 'SHIPPED': return { bg: t.isDark ? '#1e293b' : '#e0f2fe', color: '#0284c7' };
      case 'DELIVERED': return { bg: t.isDark ? '#14532d' : '#dcfce7', color: '#15803d' };
      default: return { bg: t.surface, color: t.textMuted };
    }
  };

  return (
    <AdminLayout>
      {/* كروت الإحصائيات */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { title: 'REVENUE', value: '$18,430', badge: '+12% vs last month', isPos: true },
          { title: 'ORDERS', value: '342', badge: '+8% vs last month', isPos: true },
          { title: 'CUSTOMERS', value: '8,412', badge: '+5% vs last month', isPos: true },
          { title: 'AVG. ORDER', value: '$53.90', badge: '-2% vs last month', isPos: false },
        ].map((stat, i) => (
          <div key={i} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: t.textMuted, fontWeight: '700', marginBottom: '8px' }}>{stat.title}</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{stat.value}</div>
            <span style={{ fontSize: '11px', color: stat.isPos ? '#16a34a' : '#dc2626', fontWeight: '600' }}>{stat.badge}</span>
          </div>
        ))}
      </div>

      {/* الرسم البياني */}
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: t.textMuted, fontWeight: '700', marginBottom: '20px' }}>REVENUE - LAST 7 DAYS</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '120px', paddingBottom: '10px' }}>
          {[
            { day: 'M', h: '40%' }, { day: 'T', h: '55%' }, { day: 'W', h: '35%' },
            { day: 'T', h: '70%' }, { day: 'F', h: '60%' }, { day: 'S', h: '90%' },
            { day: 'S', h: '100%', active: true }
          ].map((bar, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
              <div style={{
                width: '100%',
                height: bar.h,
                background: bar.active ? t.accent : (t.isDark ? '#381a14' : '#f4ddd5'),
                borderRadius: '6px'
              }} />
              <span style={{ fontSize: '12px', color: t.textMuted }}>{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* جدول أحدث الطلبات */}
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.08em', color: t.textMuted, fontWeight: '700' }}>RECENT ORDERS</div>
          <Link to="/admin/orders" style={{ color: t.accent, fontSize: '12px', fontWeight: '700', textDecoration: 'none' }}>VIEW ALL</Link>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}`, fontSize: '11px', color: t.textMuted, letterSpacing: '0.08em' }}>
              <th style={{ padding: '12px 8px' }}>ORDER</th>
              <th style={{ padding: '12px 8px' }}>CUSTOMER</th>
              <th style={{ padding: '12px 8px' }}>DATE</th>
              <th style={{ padding: '12px 8px' }}>ITEMS</th>
              <th style={{ padding: '12px 8px' }}>TOTAL</th>
              <th style={{ padding: '12px 8px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((ord) => {
              const badge = getBadgeStyle(ord.status);
              return (
                <tr key={ord.id} style={{ borderBottom: `1px solid ${t.border}`, fontSize: '13px' }}>
                  <td style={{ padding: '12px 8px', fontWeight: '700' }}>{ord.id}</td>
                  <td style={{ padding: '12px 8px' }}>{ord.customer}</td>
                  <td style={{ padding: '12px 8px', color: t.textMuted }}>{ord.date}</td>
                  <td style={{ padding: '12px 8px' }}>{ord.items}</td>
                  <td style={{ padding: '12px 8px', fontWeight: '600' }}>{ord.total}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.05em', fontWeight: '700', padding: '4px 10px', borderRadius: '12px', background: badge.bg, color: badge.color }}>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}