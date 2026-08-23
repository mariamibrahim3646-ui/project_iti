import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function SignUp() {
  const { theme: t } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) return setErrorMsg('Please enter your name.');
    if (!email.includes('@')) return setErrorMsg('Please enter a valid email.');
    if (password.length < 6) return setErrorMsg('Password must be at least 6 characters.');
    if (password !== confirmPassword) return setErrorMsg('Passwords do not match.');

    localStorage.setItem('signupName', name.trim());
    localStorage.setItem('signupEmail', email.trim());
    localStorage.setItem('signupPassword', password);

    navigate('/login');
  };

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: '100vh', padding: '50px 20px', transition: 'all 0.3s ease' }}>
      <main style={{ maxWidth: '460px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          width: '56px', height: '56px', background: t.surface, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px'
        }}>🌸</div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '32px', margin: '0 0 8px' }}>Begin your ritual</h1>
        <p style={{ color: t.textMuted, fontSize: '14px', marginBottom: '28px' }}>Create your Serene account</p>

        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '32px', textAlign: 'left' }}>
          {errorMsg && (
            <div style={{ background: '#FADADA', color: '#9B1C1C', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', fontWeight: '700', color: t.accent, marginBottom: '6px' }}>FULL NAME</label>
            <input
              type="text"
              placeholder="Emma Vance"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', marginBottom: '16px', border: `1px solid ${t.border}`, borderRadius: '10px', background: t.bg, color: t.text, boxSizing: 'border-box' }}
            />

            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', fontWeight: '700', color: t.accent, marginBottom: '6px' }}>EMAIL</label>
            <input
              type="email"
              placeholder="you@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', marginBottom: '16px', border: `1px solid ${t.border}`, borderRadius: '10px', background: t.bg, color: t.text, boxSizing: 'border-box' }}
            />

            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', fontWeight: '700', color: t.accent, marginBottom: '6px' }}>PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', marginBottom: '16px', border: `1px solid ${t.border}`, borderRadius: '10px', background: t.bg, color: t.text, boxSizing: 'border-box' }}
            />

            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', fontWeight: '700', color: t.accent, marginBottom: '6px' }}>CONFIRM PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', marginBottom: '20px', border: `1px solid ${t.border}`, borderRadius: '10px', background: t.bg, color: t.text, boxSizing: 'border-box' }}
            />

            <button type="submit" style={{ width: '100%', padding: '12px', background: t.accent, color: '#fff', border: 'none', borderRadius: '25px', fontWeight: '600', cursor: 'pointer', letterSpacing: '0.1em' }}>
              CREATE ACCOUNT
            </button>
          </form>
        </div>

        <p style={{ marginTop: '20px', fontSize: '14px', color: t.textMuted }}>
          Already have an account? <Link to="/login" style={{ color: t.accent, fontWeight: '600' }}>Sign in</Link>
        </p>
      </main>
    </div>
  );
}