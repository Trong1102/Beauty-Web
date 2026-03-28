import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, drawerOpen, setDrawerOpen, removeItem, updateQty, totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setDrawerOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div className={`cart-backdrop ${drawerOpen ? 'cart-backdrop-open' : ''}`} onClick={() => setDrawerOpen(false)} />

      {/* Drawer */}
      <div className={`cart-drawer ${drawerOpen ? 'cart-drawer-open' : ''}`}>
        <div className="cart-drawer-header">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 7H4L5 9z" /></svg>
            <span className="font-bold text-lg">Giỏ hàng</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>
          <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)}>✕</button>
        </div>

        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <p className="font-semibold mb-2">Giỏ hàng trống</p>
              <p className="text-sm text-muted">Hãy thêm sản phẩm vào giỏ nhé!</p>
              <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setDrawerOpen(false)}>
                Khám phá sản phẩm
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cart.map(item => (
                  <div key={item.id} className="cart-drawer-item">
                    <img src={item.image} alt={item.sku} className="cart-item-img" />
                    <div className="cart-item-info">
                      <span className="text-xs text-muted">{item.brand}</span>
                      <p className="font-semibold text-sm">{item.sku}</p>
                      <p className="text-primary font-bold">{(item.price * item.qty).toLocaleString()} ₫</p>
                    </div>
                    <div className="cart-item-controls">
                      <div className="qty-controls">
                        <button className="qty-btn" onClick={() => item.qty === 1 ? removeItem(item.id) : updateQty(item.id, item.qty - 1)}>−</button>
                        <span className="qty-value">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>Xóa</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-drawer-footer">
                {shipping === 0 && (
                  <div className="free-shipping-tag">🎉 Miễn phí vận chuyển!</div>
                )}
                {shipping > 0 && (
                  <div className="shipping-notice">
                    Mua thêm <strong>{(500000 - subtotal).toLocaleString()}₫</strong> để miễn phí ship
                  </div>
                )}
                <div className="cart-totals">
                  <div className="flex justify-between text-sm text-muted mb-1">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString()} ₫</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted mb-3">
                    <span>Phí vận chuyển</span>
                    <span>{shipping === 0 ? 'Miễn phí' : shipping.toLocaleString() + ' ₫'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{total.toLocaleString()} ₫</span>
                  </div>
                </div>
                <button className="btn-primary w-full" style={{ marginTop: '1rem' }} onClick={() => { setDrawerOpen(false); navigate('/checkout'); }}>
                  Thanh toán →
                </button>
                <button className="btn-outline w-full" style={{ marginTop: '0.5rem' }} onClick={() => { setDrawerOpen(false); navigate('/cart'); }}>
                  Xem giỏ hàng
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
