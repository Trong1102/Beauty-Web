import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const shipping = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    fullName: '', phone: '', address: '', city: '', note: '',
    payment: 'cod',
    cardNumber: '', cardExpiry: '', cardCvv: '', cardName: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!form.fullName.trim()) err.fullName = 'Vui lòng nhập họ tên';
    if (!/^0\d{9}$/.test(form.phone.trim())) err.phone = 'Số điện thoại không hợp lệ (bắt đầu bằng 0, 10 số)';
    if (!form.address.trim()) err.address = 'Vui lòng nhập địa chỉ';
    if (!form.city.trim()) err.city = 'Vui lòng chọn tỉnh/thành phố';
    if (form.payment === 'card') {
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) err.cardNumber = 'Số thẻ phải có 16 chữ số';
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) err.cardExpiry = 'Định dạng MM/YY';
      if (!/^\d{3,4}$/.test(form.cardCvv)) err.cardCvv = 'CVV không hợp lệ';
      if (!form.cardName.trim()) err.cardName = 'Vui lòng nhập tên chủ thẻ';
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) { setErrors(err); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1500)); // simulate processing

    const order = placeOrder({
      items: cart,
      shipping: { fullName: form.fullName, phone: form.phone, address: form.address, city: form.city, note: form.note },
      payment: form.payment,
      subtotal,
      shippingFee: shipping,
      total,
    });
    clearCart();
    setLoading(false);
    navigate('/order-success', { state: { order } });
  };

  const cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Huế', 'Nha Trang', 'Vũng Tàu', 'Bình Dương', 'Đồng Nai', 'Tỉnh/TP khác'];

  return (
    <section className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '1100px' }}>
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
      <form onSubmit={handleSubmit} className="checkout-layout">

        {/* Left: Shipping + Payment */}
        <div className="checkout-left">
          {/* Shipping Info */}
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 className="font-bold text-xl mb-5" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary)' }}>①</span> Thông tin giao hàng
            </h2>
            <div className="checkout-form-grid">
              <div className="form-group">
                <label className="form-label">Họ và tên *</label>
                <input id="fullName" name="fullName" className={`form-input ${errors.fullName ? 'form-input-error' : ''}`} placeholder="Nguyễn Văn A" value={form.fullName} onChange={handleChange} />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Số điện thoại *</label>
                <input id="phone" name="phone" className={`form-input ${errors.phone ? 'form-input-error' : ''}`} placeholder="0912345678" value={form.phone} onChange={handleChange} />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Địa chỉ *</label>
              <input id="address" name="address" className={`form-input ${errors.address ? 'form-input-error' : ''}`} placeholder="Số nhà, tên đường, phường/xã, quận/huyện" value={form.address} onChange={handleChange} />
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Tỉnh / Thành phố *</label>
              <select id="city" name="city" className={`form-input ${errors.city ? 'form-input-error' : ''}`} value={form.city} onChange={handleChange}>
                <option value="">-- Chọn tỉnh/thành --</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.city && <span className="form-error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Ghi chú (tuỳ chọn)</label>
              <textarea id="note" name="note" className="form-input" rows={3} placeholder="Ghi chú cho người giao hàng..." value={form.note} onChange={handleChange} style={{ resize: 'vertical' }} />
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 className="font-bold text-xl mb-5" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--primary)' }}>②</span> Phương thức thanh toán
            </h2>
            <div className="payment-options">
              <label className={`payment-option ${form.payment === 'cod' ? 'payment-option-selected' : ''}`}>
                <input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} />
                <span className="payment-icon">💵</span>
                <div>
                  <strong>Thanh toán khi nhận hàng (COD)</strong>
                  <p className="text-sm text-muted">Trả tiền mặt khi giao hàng đến tay bạn</p>
                </div>
              </label>
              <label className={`payment-option ${form.payment === 'card' ? 'payment-option-selected' : ''}`}>
                <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} />
                <span className="payment-icon">💳</span>
                <div>
                  <strong>Thẻ tín dụng / ghi nợ</strong>
                  <p className="text-sm text-muted">Visa, Mastercard, JCB</p>
                </div>
              </label>
              <label className={`payment-option ${form.payment === 'transfer' ? 'payment-option-selected' : ''}`}>
                <input type="radio" name="payment" value="transfer" checked={form.payment === 'transfer'} onChange={handleChange} />
                <span className="payment-icon">🏦</span>
                <div>
                  <strong>Chuyển khoản ngân hàng</strong>
                  <p className="text-sm text-muted">Chuyển khoản trước, đơn xử lý sau 30 phút</p>
                </div>
              </label>
            </div>

            {/* Card Form */}
            {form.payment === 'card' && (
              <div className="card-form animate-fade">
                <div className="card-form-preview">
                  <div className="card-chip" />
                  <div className="card-num-display">{form.cardNumber ? form.cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}</div>
                  <div className="card-bottom-row">
                    <span>{form.cardName || 'TÊN CHỦ THẺ'}</span>
                    <span>{form.cardExpiry || 'MM/YY'}</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Số thẻ *</label>
                  <input id="cardNumber" name="cardNumber" className={`form-input ${errors.cardNumber ? 'form-input-error' : ''}`} placeholder="1234 5678 9012 3456" maxLength={16} value={form.cardNumber} onChange={handleChange} />
                  {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
                </div>
                <div className="checkout-form-grid">
                  <div className="form-group">
                    <label className="form-label">Ngày hết hạn *</label>
                    <input id="cardExpiry" name="cardExpiry" className={`form-input ${errors.cardExpiry ? 'form-input-error' : ''}`} placeholder="MM/YY" maxLength={5} value={form.cardExpiry} onChange={handleChange} />
                    {errors.cardExpiry && <span className="form-error">{errors.cardExpiry}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV *</label>
                    <input id="cardCvv" name="cardCvv" className={`form-input ${errors.cardCvv ? 'form-input-error' : ''}`} placeholder="123" maxLength={4} value={form.cardCvv} onChange={handleChange} />
                    {errors.cardCvv && <span className="form-error">{errors.cardCvv}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Tên chủ thẻ *</label>
                  <input id="cardName" name="cardName" className={`form-input ${errors.cardName ? 'form-input-error' : ''}`} placeholder="NGUYEN VAN A" value={form.cardName} onChange={e => handleChange({ target: { name: 'cardName', value: e.target.value.toUpperCase() } })} />
                  {errors.cardName && <span className="form-error">{errors.cardName}</span>}
                </div>
                <div className="secure-note">🔒 Thông tin thẻ được mã hóa an toàn (mô phỏng — không thu phí thật)</div>
              </div>
            )}

            {form.payment === 'transfer' && (
              <div className="transfer-info animate-fade">
                <p className="font-bold mb-2">Thông tin chuyển khoản:</p>
                <p>Ngân hàng: <strong>Vietcombank</strong></p>
                <p>Số TK: <strong>1234 5678 90</strong></p>
                <p>Tên TK: <strong>SHINEBEAMBEAUTY VIETNAM</strong></p>
                <p>Nội dung: <strong>Tên + SĐT của bạn</strong></p>
                <div className="secure-note">⚡ Đơn hàng được xác nhận trong vòng 30 phút sau khi nhận thanh toán</div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="checkout-right">
          <div className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: '120px' }}>
            <h2 className="font-bold text-lg mb-4">Đơn hàng của bạn</h2>
            {cart.map(item => (
              <div key={item.id} className="checkout-item">
                <div style={{ position: 'relative' }}>
                  <img src={item.image} alt={item.sku} className="checkout-item-img" />
                  <span className="checkout-item-qty">{item.qty}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="text-sm font-semibold">{item.sku}</p>
                  <p className="text-xs text-muted">{item.brand}</p>
                </div>
                <p className="font-bold text-sm">{(item.price * item.qty).toLocaleString()} ₫</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1rem', marginTop: '1rem' }}>
              <div className="flex justify-between text-sm text-muted mb-2">
                <span>Tạm tính</span><span>{subtotal.toLocaleString()} ₫</span>
              </div>
              <div className="flex justify-between text-sm text-muted mb-3">
                <span>Vận chuyển</span><span>{shipping === 0 ? '🎉 Miễn phí' : shipping.toLocaleString() + ' ₫'}</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Tổng</span><span className="text-primary">{total.toLocaleString()} ₫</span>
              </div>
            </div>
            <button
              type="submit"
              id="place-order-btn"
              className="btn-primary w-full"
              style={{ marginTop: '1.5rem', padding: '1rem', fontSize: '1rem', position: 'relative', overflow: 'hidden' }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span className="spinner" /> Đang xử lý...
                </span>
              ) : '🛒 Đặt hàng ngay'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutPage;
