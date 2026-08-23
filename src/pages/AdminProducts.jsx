import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import AdminLayout from './AdminLayout';

export default function AdminProducts() {
  const { theme: t } = useTheme();

  // جلب المنتجات من localStorage أو استخدام القائمة الابتدائية
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('adminProducts');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // حالة التراجع عن الحذف (Undo)
  const [lastDeleted, setLastDeleted] = useState(null);
  const [showUndoToast, setShowUndoToast] = useState(false);

  // تحديث localStorage عند أي تغيير
  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  // دالة الحذف مع تفعيل زر Undo
  const handleDeleteProduct = (productToDelete) => {
    const index = products.findIndex((p) => p.id === productToDelete.id);
    const updated = products.filter((p) => p.id !== productToDelete.id);
    
    setProducts(updated);
    setLastDeleted({ product: productToDelete, index });
    setShowUndoToast(true);

    // إخفاء إشعار التراجع تلقائياً بعد 6 ثوانٍ
    setTimeout(() => {
      setShowUndoToast(false);
    }, 6000);
  };

  // دالة التراجع عن الحذف
  const handleUndoDelete = () => {
    if (!lastDeleted) return;
    const restored = [...products];
    restored.splice(lastDeleted.index, 0, lastDeleted.product);
    setProducts(restored);
    setLastDeleted(null);
    setShowUndoToast(false);
  };

  // دالة حفظ المنتج (إضافة جديد أو تعديل)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    
    if (isAddingNew) {
      // تجهيز بيانات المنتج الجديد بنفس خصائص الكروت المعتمدة في Shop
      const newProd = {
        id: Date.now(),
        name: editingProduct.name || 'New Botanical Item',
        category: editingProduct.category || 'SERUMS & OILS',
        price: Number(editingProduct.price) || 0,
        image: editingProduct.image || 'https://images.unsplash.com/photo-1608248597260-848e35f8d9fa?w=500',
        subtext: editingProduct.subtext || 'Daily skin nurture',
        size: '50 ml / 1.7 fl oz',
        rating: 5.0,
        reviewsCount: 1,
        description: editingProduct.description || 'Nourishing daily formula with natural botanical ingredients.',
        ingredients: 'Botanical oil blend, Vitamin E.',
        howToUse: 'Apply 2-3 drops to clean skin daily.',
        badge: editingProduct.badge || 'NEW',
        badgeBg: '#286f2b'
      };

      setProducts([newProd, ...products]);
    } else {
      setProducts(products.map((p) => p.id === editingProduct.id ? { ...p, ...editingProduct } : p));
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  return (
    <AdminLayout>
      {/* الهيدر وزر إضافة منتج جديد */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', margin: 0 }}>Products</h1>
        <button
          onClick={() => {
            setEditingProduct({
              name: '',
              category: 'SERUMS & OILS',
              price: '',
              image: '',
              subtext: '',
              description: '',
              badge: 'NEW'
            });
            setIsAddingNew(true);
          }}
          style={{
            background: t.accent, color: '#fff', border: 'none', padding: '10px 20px',
            borderRadius: '20px', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          + ADD PRODUCT
        </button>
      </div>

      {/* جدول المنتجات */}
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '16px 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}`, fontSize: '11px', color: t.textMuted, letterSpacing: '0.08em' }}>
              <th style={{ padding: '12px 8px' }}>PRODUCT</th>
              <th style={{ padding: '12px 8px' }}>CATEGORY</th>
              <th style={{ padding: '12px 8px' }}>PRICE</th>
              <th style={{ padding: '12px 8px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} style={{ borderBottom: `1px solid ${t.border}`, fontSize: '14px' }}>
                <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={prod.image || 'https://via.placeholder.com/40'} alt={prod.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: '600' }}>{prod.name}</div>
                    <div style={{ fontSize: '11px', color: t.textMuted }}>{prod.subtext}</div>
                  </div>
                </td>
                <td style={{ padding: '12px 8px', color: t.textMuted, fontSize: '13px' }}>{prod.category}</td>
                <td style={{ padding: '12px 8px', fontWeight: '700' }}>${prod.price}</td>
                <td style={{ padding: '12px 8px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => { setEditingProduct(prod); setIsAddingNew(false); }}
                      style={{ background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '8px', padding: '6px 12px', fontSize: '12px', color: t.text, cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod)}
                      style={{ background: '#fee2e2', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', color: '#dc2626', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* إشعار وزر التراجع (Undo Toast) */}
      {showUndoToast && lastDeleted && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', background: '#1e293b', color: '#fff',
          padding: '14px 20px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1100, fontSize: '13px'
        }}>
          <span>Deleted <strong>"{lastDeleted.product.name}"</strong></span>
          <button
            onClick={handleUndoDelete}
            style={{
              background: t.accent, color: '#fff', border: 'none', borderRadius: '8px',
              padding: '6px 14px', fontWeight: '700', cursor: 'pointer', fontSize: '12px'
            }}
          >
            UNDO
          </button>
        </div>
      )}

      {/* النافذة المنبثقة للإضافة والتعديل */}
      {editingProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: t.surface, color: t.text, width: '440px', borderRadius: '16px', padding: '24px', border: `1px solid ${t.border}`, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', marginTop: 0, marginBottom: '16px' }}>
              {isAddingNew ? 'Add New Product' : 'Edit Product'}
            </h2>
            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', color: t.textMuted, fontWeight: '700' }}>NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sea Buckthorn Serum"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${t.border}`, background: t.bg, color: t.text, boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: t.textMuted, fontWeight: '700' }}>CATEGORY</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${t.border}`, background: t.bg, color: t.text, boxSizing: 'border-box' }}
                  >
                    <option value="SERUMS & OILS">SERUMS & OILS</option>
                    <option value="MOISTURIZERS">MOISTURIZERS</option>
                    <option value="CLEANSERS">CLEANSERS</option>
                    <option value="TONERS">TONERS</option>
                    <option value="MASKS">MASKS</option>
                    <option value="SUNSCREEN">SUNSCREEN</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: t.textMuted, fontWeight: '700' }}>PRICE ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="48"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${t.border}`, background: t.bg, color: t.text, boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: t.textMuted, fontWeight: '700' }}>SUBTEXT</label>
                <input
                  type="text"
                  placeholder="e.g. Hydration & Glow"
                  value={editingProduct.subtext || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, subtext: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${t.border}`, background: t.bg, color: t.text, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: t.textMuted, fontWeight: '700' }}>IMAGE URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${t.border}`, background: t.bg, color: t.text, boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: t.textMuted, fontWeight: '700' }}>DESCRIPTION</label>
                <textarea
                  rows="3"
                  placeholder="Product description..."
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${t.border}`, background: t.bg, color: t.text, boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="submit" style={{ flex: 1, padding: '10px', background: t.accent, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  {isAddingNew ? 'Add Product' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => setEditingProduct(null)} style={{ flex: 1, padding: '10px', background: 'transparent', border: `1px solid ${t.border}`, color: t.text, borderRadius: '8px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}