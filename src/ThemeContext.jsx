import { createContext, useContext, useState, useEffect } from 'react';

const light = {
  bg: '#fdf5f2',
  bgAlt: '#f9ede8',
  bgStrip: '#f4ddd5',
  bgDark: '#3d1f1a',
  surface: '#fde8e2',
  surfaceHover: '#f9ddd5',
  border: '#eacfc8',
  text: '#2a1510',
  textMuted: '#8b6058',
  textSubtle: '#b8908a',
  accent: '#c97060',
  accentDark: '#a85848',
  accentFg: '#fff5f2',
  navBg: 'rgba(253,245,242,0.94)',
  inputBg: '#fdf5f2',
  isDark: false,
};

const dark = {
  bg: '#1c0e0a',
  bgAlt: '#2a1510',
  bgStrip: '#381a14',
  bgDark: '#0e0705',
  surface: '#2f1812',
  surfaceHover: '#3a1e17',
  border: '#4a2520',
  text: '#fdf0ec',
  textMuted: '#c0908a',
  textSubtle: '#8b6058',
  accent: '#e89080',
  accentDark: '#c97060',
  accentFg: '#1c0e0a',
  navBg: 'rgba(28,14,10,0.94)',
  inputBg: '#2a1510',
  isDark: true,
};

const Ctx = createContext();

export function ThemeProvider({ children }) {
  // قراءة الثيم المحفوظ عند التحميل
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('isDark');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // حفظ الثيم الجديد فور تغييره
  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
  }, [isDark]);

  const theme = isDark ? dark : light;

  return (
    <Ctx.Provider value={{ theme, toggleTheme: () => setIsDark((v) => !v) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);