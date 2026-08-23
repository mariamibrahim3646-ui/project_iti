import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function Profile({ user, onLogout, setUser }) {
  const { theme: t } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name || '', email: user?.email || '' });

  // جلب الطلبات المخزنة dynamic من localStorage
  const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');

  const handleSaveEdit = () => {
    if (!editForm.name.trim() || !editForm.email.includes('@')) {
      alert('رجاءً أدخل بيانات صحيحة');
      return;
    }

    localStorage.setItem('userName', editForm.name.trim());
    localStorage.setItem('userEmail', editForm.email.trim());

    setUser({ ...user, name: editForm.name.trim(), email: editForm.email.trim() });
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const avatarChar = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: '80vh', paddingBottom: '60px' }}>
      {/* Header البروفايل */}
      <section style={{ background: t.surface || '#fbe3d8', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: t.accent || '#c97060', color: '#fff',
              fontSize: '26px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {avatarChar}
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', fontFamily: 'Playfair Display, serif' }}>{user?.name}</h1>
              <span style={{ color: t.textMuted, fontSize: '14px' }}>{user?.email}</span>
            </div>
          </div>
          <button 
            onClick={handleLogoutClick}
            style={{
              padding: '8px 20px', background: 'transparent',
              border: `1px solid ${t.border}`, borderRadius: '20px',
              color: t.text, cursor: 'pointer', fontSize: '13px'
            }}
          >
            Log Out
          </button>
        </div>

        {/* التبويبات */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 24px 0', display: 'flex', gap: '32px' }}>
          <button
            onClick={() => setActiveTab('account')}
            style={{
              background: 'none', border: 'none', paddingBottom: '12px', cursor: 'pointer',
              color: activeTab === 'account' ? t.text : t.textMuted,
              borderBottom: activeTab === 'account' ? `2px solid ${t.accent}` : '2px solid transparent',
              fontWeight: activeTab === 'account' ? '600' : '400', fontSize: '13px', letterSpacing: '0.1em'
            }}
          >
            ACCOUNT
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              background: 'none', border: 'none', paddingBottom: '12px', cursor: 'pointer',
              color: activeTab === 'orders' ? t.text : t.textMuted,
              borderBottom: activeTab === 'orders' ? `2px solid ${t.accent}` : '2px solid transparent',
              fontWeight: activeTab === 'orders' ? '600' : '400', fontSize: '13px', letterSpacing: '0.1em'
            }}
          >
            ORDERS ({orders.length})
          </button>
        </div>
      </section>

      {/* تفاصيل التبويب النشط */}
      <main style={{ maxWidth: '800px', margin: '40px auto 0', padding: '0 24px' }}>
        {activeTab === 'account' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Personal Details</h3>
              {!isEditing && (
                <button 
                  onClick={() => { setEditForm({ name: user.name, email: user.email }); setIsEditing(true); }}
                  style={{ background: 'none', border: 'none', color: t.accent, cursor: 'pointer', fontWeight: '600' }}
                >
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: t.surface, padding: '20px', borderRadius: '12px' }}>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${t.border}` }}
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  style={{ padding: '10px', borderRadius: '8px', border: `1px solid ${t.border}` }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleSaveEdit} style={{ background: t.accent, color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '8px', cursor: 'pointer' }}>Save</button>
                  <button onClick={() => setIsEditing(false)} style={{ background: 'transparent', border: `1px solid ${t.border}`, color: t.text, padding: '8px 18px', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ background: t.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${t.border}` }}>
                  <span style={{color:t.textMuted}}>Name</span> <strong>{user?.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${t.border}` }}>
                  <span style={{color:t.textMuted}}>Email</span> <strong>{user?.email}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                  <span style={{color:t.textMuted}}>Role</span> <strong>{user?.role}</strong>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.length === 0 ? (
              <div style={{ background: t.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
                <p style={{ margin: 0, color: t.textMuted }}>No active orders found.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} style={{ background: t.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: `1px solid ${t.border}`, paddingBottom: '8px' }}>
                    <div>
                      <strong>Order #{order.id}</strong>
                      <span style={{ display: 'block', fontSize: '12px', color: t.textMuted }}>{order.date}</span>
                    </div>
                    <span style={{ color: t.accent, fontWeight: '600' }}>${order.total} ({order.status})</span>
                  </div>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{item.name}</p>
                        <span style={{ fontSize: '12px', color: t.textMuted }}>Qty: {item.quantity} × ${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}