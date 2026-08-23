import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useTheme } from '../ThemeContext';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, checkout } = useCart();
  const { theme: t } = useTheme();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    const success = checkout();
    if (success) {
      closeCart();
      navigate('/profile');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      backdropFilter: 'blur(3px)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: t.surface,
        color: t.text,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.15)'
      }}>
        
        {/* Cart Header */}
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>Your Shopping Bag ({cart.length})</h2>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: t.text }}>✕</button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: t.textMuted, marginTop: '40px' }}>Your bag is currently empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingBottom: '16px', borderBottom: `1px solid ${t.border}` }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontFamily: 'Playfair Display, serif' }}>{item.name}</h4>
                  <p style={{ margin: '0 0 8px', fontSize: '13px', color: t.accent, fontWeight: '600' }}>${item.price}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text, width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer' }}>-</button>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.text, width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer' }}>+</button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: t.textMuted, cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: `1px solid ${t.border}`, background: t.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: '600', fontSize: '16px' }}>
              <span>Total:</span>
              <span style={{ color: t.accent }}>${total}</span>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '14px',
                background: t.accent,
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                fontWeight: '600',
                cursor: 'pointer',
                letterSpacing: '0.1em'
              }}
            >
              CHECKOUT & PLACE ORDER
            </button>
          </div>
        )}

      </div>
    </div>
  );
}