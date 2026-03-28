import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  useEffect(() => {
    if (!order) navigate('/');
  }, [order, navigate]);

  if (!order) return null;

  const paymentLabel = {
    cod: '💵 Thanh toán khi nhận hàng (COD)',
    card: '💳 Thẻ tín dụng / ghi nợ',
    transfer: '🏦 Chuyển khoản ngân hàng',
  }[order.payment] || order.payment;

  const createdDate = new Date(order.createdAt).toLocaleString('vi-VN');
  const estimatedDelivery = (() => {
    const d = new Date(order.createdAt);
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });
  })();

  return (
    <section className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '700px' }}>
      {/* Success animation */}
      <div className="success-hero">
        <div className="success-checkmark">
          <svg viewBox="0 0 52 52" className="checkmark-svg">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold" style={{ marginTop: '1.5rem' }}>Đặt hàng thành công! 🎉</h1>
        <p className="text-muted" style={{ marginTop: '0.5rem' }}>Cảm ơn bạn đã tin tưởng SHINEBEAMBEAUTY</p>
      </div>

      {/* Order Info Card */}
      <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
        <div className="order-id-badge">
          <span className="text-sm text-muted">Mã đơn hàng</span>
          <span className="font-bold text-primary text-lg">{order.id}</span>
        </div>

        <div className="order-meta">
          <div className="order-meta-item">
            <span className="text-xs text-muted uppercase tracking-wider">Ngày đặt</span>
            <span className="font-semibold">{createdDate}</span>
          </div>
          <div className="order-meta-item">
            <span className="text-xs text-muted uppercase tracking-wider">Dự kiến giao</span>
            <span className="font-semibold">{estimatedDelivery}</span>
          </div>
          <div className="order-meta-item">
            <span className="text-xs text-muted uppercase tracking-wider">Thanh toán</span>
            <span className="font-semibold">{paymentLabel}</span>
          </div>
          <div className="order-meta-item">
            <span className="text-xs text-muted uppercase tracking-wider">Trạng thái</span>
            <span className="order-status-badge">✓ Đã xác nhận</span>
          </div>
        </div>

        {/* Shipping info */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
          <h3 className="font-bold mb-3">📦 Giao đến</h3>
          <p className="font-semibold">{order.shipping.fullName} — {order.shipping.phone}</p>
          <p className="text-muted text-sm">{order.shipping.address}</p>
          <p className="text-muted text-sm">{order.shipping.city}</p>
          {order.shipping.note && <p className="text-muted text-sm italic">Ghi chú: {order.shipping.note}</p>}
        </div>

        {/* Items */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
          <h3 className="font-bold mb-3">🛍️ Sản phẩm</h3>
          {order.items.map(item => (
            <div key={item.id} className="success-item">
              <img src={item.image} alt={item.sku} className="success-item-img" />
              <div style={{ flex: 1 }}>
                <p className="font-semibold text-sm">{item.sku}</p>
                <p className="text-xs text-muted">{item.brand} × {item.qty}</p>
              </div>
              <p className="font-bold">{(item.price * item.qty).toLocaleString()} ₫</p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '1rem', marginTop: '1rem' }}>
          <div className="flex justify-between text-sm text-muted mb-1">
            <span>Tạm tính</span><span>{order.subtotal.toLocaleString()} ₫</span>
          </div>
          <div className="flex justify-between text-sm text-muted mb-3">
            <span>Vận chuyển</span><span>{order.shippingFee === 0 ? 'Miễn phí' : order.shippingFee.toLocaleString() + ' ₫'}</span>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <span>Tổng cộng</span><span className="text-primary">{order.total.toLocaleString()} ₫</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <Link to="/shop" className="btn-primary" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>
          Tiếp tục mua sắm
        </Link>
        <Link to="/" className="btn-outline" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>
          Về trang chủ
        </Link>
      </div>
    </section>
  );
};

export default OrderSuccessPage;
