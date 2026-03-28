import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeItem, updateQty, subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 0 ? (subtotal > 500000 ? 0 : 30000) : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '4rem' }}>🛍️</div>
        <h2 className="text-2xl font-bold">Giỏ hàng trống</h2>
        <p className="text-muted">Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>
        <button className="btn-primary" onClick={() => navigate('/shop')}>Mua sắm ngay</button>
      </div>
    );
  }

  return (
    <section className="container" style={{ padding: '2rem', maxWidth: '1000px' }}>
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

      <div className="cart-page-layout">
        {/* Items */}
        <div className="cart-page-items">
          {cart.map(item => (
            <div key={item.id} className="cart-page-item glass-card">
              <img src={item.image} alt={item.sku} className="cart-page-img" onClick={() => navigate(`/product/${item.id}`)} style={{ cursor: 'pointer' }} />
              <div className="cart-page-item-info">
                <span className="text-xs text-muted">{item.brand}</span>
                <h3 className="font-bold" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${item.id}`)}>{item.sku}</h3>
                <p className="text-primary font-bold">{item.price.toLocaleString()} ₫</p>
              </div>
              <div className="cart-page-item-right">
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => item.qty === 1 ? removeItem(item.id) : updateQty(item.id, item.qty - 1)}>−</button>
                  <span className="qty-value">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <p className="font-bold text-lg" style={{ marginTop: '0.5rem' }}>{(item.price * item.qty).toLocaleString()} ₫</p>
                <button className="remove-btn" style={{ marginTop: '0.5rem' }} onClick={() => removeItem(item.id)}>Xóa</button>
              </div>
            </div>
          ))}
          <button className="btn-outline" style={{ marginTop: '1rem' }} onClick={() => navigate('/shop')}>← Tiếp tục mua sắm</button>
        </div>

        {/* Summary */}
        <div className="cart-summary glass-card">
          <h2 className="font-bold text-xl mb-6">Tóm tắt đơn hàng</h2>
          <div className="flex justify-between text-sm text-muted mb-2">
            <span>Tạm tính ({cart.reduce((s, i) => s + i.qty, 0)} sản phẩm)</span>
            <span>{subtotal.toLocaleString()} ₫</span>
          </div>
          <div className="flex justify-between text-sm text-muted mb-4">
            <span>Phí vận chuyển</span>
            <span>{shipping === 0 ? '🎉 Miễn phí' : shipping.toLocaleString() + ' ₫'}</span>
          </div>
          {shipping > 0 && (
            <div className="shipping-notice" style={{ marginBottom: '1rem' }}>
              Mua thêm <strong>{(500000 - subtotal).toLocaleString()}₫</strong> để freeship
            </div>
          )}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1rem' }} className="flex justify-between font-bold text-xl mb-6">
            <span>Tổng cộng</span>
            <span className="text-primary">{total.toLocaleString()} ₫</span>
          </div>
          <button className="btn-primary w-full" style={{ fontSize: '1rem', padding: '1rem' }} onClick={() => navigate('/checkout')}>
            Tiến hành thanh toán →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
