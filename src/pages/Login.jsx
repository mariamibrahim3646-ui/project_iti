import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

export default function Login({ onLoginSuccess }) {
  const { theme: t } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const { email, password } = formData;

    let userObj = null;

    // 1. التحقق من بيانات الأدمن
    if (email === 'admin@serene.co' && password === 'admin123') {
      userObj = { name: 'Admin', email, role: 'admin' };
    } 
    // 2. التحقق من بيانات المستخدم التجريبي
    else if (email === 'user@serene.co' && password === 'user123') {
      userObj = { name: 'User', email, role: 'user' };
    } 
    // 3. التحقق من بيانات المستخدم المسجل جديداً
    else {
      const savedEmail = localStorage.getItem('signupEmail');
      const savedPassword = localStorage.getItem('signupPassword');
      const savedName = localStorage.getItem('signupName');

      if (email === savedEmail && password === savedPassword) {
        userObj = { name: savedName, email, role: 'user' };
      }
    }

    if (userObj) {
      // حفظ بيانات الجلسة
      localStorage.setItem('userEmail', userObj.email);
      localStorage.setItem('userRole', userObj.role);
      localStorage.setItem('userName', userObj.name);

      if (onLoginSuccess) onLoginSuccess(userObj);

      // التوجيه الصحيح حسب نوع الحساب
      navigate(userObj.role === 'admin' ? '/admin' : '/profile');
    } else {
      setErrorMsg('Invalid email or password.');
    }
  };

  // دالة الدخول كـ Guest
  const handleGuestLogin = () => {
    const guestUser = { name: 'Guest', role: 'guest' };
    localStorage.removeItem('userEmail');
    localStorage.setItem('userRole', 'guest');
    localStorage.setItem('userName', 'Guest');

    if (onLoginSuccess) onLoginSuccess(guestUser);
    navigate('/');
  };

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: '100vh', padding: '50px 20px', transition: 'all 0.3s ease' }}>
      <main style={{ maxWidth: '460px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          width: '56px', height: '56px', background: t.surface, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px'
        }}>🌸</div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '32px', margin: '0 0 8px' }}>Welcome back</h1>
        <p style={{ color: t.textMuted, fontSize: '14px', marginBottom: '28px' }}>Sign in to your Serene account</p>

        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '32px', textAlign: 'left' }}>
          {errorMsg && (
            <div style={{ background: '#FADADA', color: '#9B1C1C', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', fontWeight: '700', color: t.accent, marginBottom: '6px' }}>EMAIL</label>
            <input
              type="email"
              placeholder="you@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', marginBottom: '16px', border: `1px solid ${t.border}`, borderRadius: '10px', background: t.bg, color: t.text, boxSizing: 'border-box' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '11px', letterSpacing: '0.1em', fontWeight: '700', color: t.accent }}>PASSWORD</label>
              <a href="#forgot" style={{ fontSize: '12px', color: t.textMuted, textDecoration: 'none' }}>Forgot?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', marginBottom: '20px', border: `1px solid ${t.border}`, borderRadius: '10px', background: t.bg, color: t.text, boxSizing: 'border-box' }}
            />

            <button type="submit" style={{ width: '100%', padding: '12px', background: t.accent, color: '#fff', border: 'none', borderRadius: '25px', fontWeight: '600', cursor: 'pointer', letterSpacing: '0.1em' }}>
              SIGN IN
            </button>
          </form>

          {/* زر دخول الـ Guest */}
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={handleGuestLogin}
              style={{
                background: 'transparent',
                border: `1px solid ${t.border}`,
                color: t.text,
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Continue as Guest ➔
            </button>
          </div>

          <div style={{ marginTop: '20px', padding: '12px', background: t.bg, border: `1px solid ${t.border}`, borderRadius: '10px', fontSize: '12px', color: t.textMuted }}>
            <strong style={{ display: 'block', marginBottom: '4px', color: t.text }}>Demo credentials:</strong>
            <div>Admin: admin@serene.co / admin123</div>
            <div>User: user@serene.co / user123</div>
          </div>
        </div>

        <p style={{ marginTop: '20px', fontSize: '14px', color: t.textMuted }}>
          Don't have an account? <Link to="/signup" style={{ color: t.accent, fontWeight: '600' }}>Sign up free</Link>
        </p>
      </main>
    </div>
  );
}