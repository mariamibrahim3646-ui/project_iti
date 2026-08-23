import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { FavoritesProvider } from './FavoritesContext';
import { CartProvider } from './CartContext';
import './responsive.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

// استيراد صفحات الأدمن
import AdminOverview from './pages/AdminOverview';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';

function Layout({ user, handleLogout, setUser }) {
  const location = useLocation();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  // تحديد المسارات التي سيتم إخفاء الناف بار والفوتر منها
  const hideHeaderFooter = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {/* عدم عرض الناف بار في اللوج إن والساين أب */}
      {!hideHeaderFooter && <Navbar user={user} onLogout={handleLogout} />}
      <CartDrawer />

      <Routes>
        {/* مسارات المتجر العام */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/shop" element={<Shop isLoggedIn={isLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail isLoggedIn={isLoggedIn} />} />
        <Route path="/favorites" element={<Favorites isLoggedIn={isLoggedIn} />} />

        <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} onLogout={handleLogout} setUser={setUser} /> : <Navigate to="/login" />}
        />

        {/* مسارات لوحة التحكم (الأدمن) */}
        <Route
          path="/admin"
          element={isAdmin ? <AdminOverview /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin/products"
          element={isAdmin ? <AdminProducts /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin/orders"
          element={isAdmin ? <AdminOrders /> : <Navigate to="/login" replace />}
        />
      </Routes>

      {/* عدم عرض الفوتر في اللوج إن والساين أب */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');

    if (email && role) {
      setUser({ name, email, role });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setUser(null);
  };

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CartProvider>
          <Router basename="/project_iti">g
            <Layout user={user} handleLogout={handleLogout} setUser={setUser} />
          </Router>
        </CartProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}