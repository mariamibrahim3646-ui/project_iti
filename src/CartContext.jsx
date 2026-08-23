import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleCart = () => setIsOpen((prev) => !prev);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // عند الضغط على Add to Cart:
  // 1. يضاف للمستندات في السلة (Cart)
  // 2. يضاف فوراً كطلب جديد في الـ Orders بالبروفايل
  // 3. لا يتم فتح النافذة الجانبية للـ Cart
  const addToCart = (product, quantity = 1) => {
    // 1. تحديث السلة
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // 2. إضافة الطلب فوراً لصفحة البروفايل (userOrders)
    const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      items: [{ ...product, quantity }],
      total: (product.price * quantity).toFixed(2),
      status: 'Processing'
    };

    localStorage.setItem('userOrders', JSON.stringify([newOrder, ...existingOrders]));

    // ملاحظة: لم نقم بستدعاء openCart() لكي لا تفتح النافذة الجانبية تلقائياً
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const checkout = () => {
    if (cart.length === 0) return false;
    clearCart();
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        toggleCart,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);