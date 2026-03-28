import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../utils/products';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
        <button className="btn-primary" onClick={() => navigate('/shop')}>← Quay lại</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <section className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Trang chủ</span>
        <span> / </span>
        <span onClick={() => navigate('/shop')} style={{ cursor: 'pointer' }}>Sản phẩm</span>
        <span> / </span>
        <span className="text-primary">{product.sku}</span>
      </div>

      <div className="product-detail-layout">
        {/* Image */}
        <div className="product-detail-img-wrap glass-card">
          <img src={product.image} alt={product.sku} className="product-detail-img" />
          {product.isNew && <span className="product-badge product-badge-new" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>Mới</span>}
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <span className="text-xs text-muted uppercase tracking-widest font-semibold">{product.brand}</span>
          <h1 className="text-3xl font-bold" style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}>{product.sku}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill={i < Math.round(product.rating) ? 'var(--accent)' : '#e0e0e0'}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="text-sm text-muted">{product.rating}/5</span>
          </div>

          <p className="text-primary font-bold" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
            {product.price.toLocaleString()} ₫
          </p>

          {/* Stats */}
          <div className="product-stats">
            <div className="product-stat">
              <span className="product-stat-value">{product.offtake}</span>
              <span className="product-stat-label">Bán/tháng</span>
            </div>
            <div className="product-stat">
              <span className="product-stat-value">{product.retention}</span>
              <span className="product-stat-label">Tỷ lệ mua lại</span>
            </div>
          </div>

          {/* Description */}
          <div className="product-description">
            <h3 className="font-bold mb-2">Về sản phẩm</h3>
            <p className="text-muted text-sm" style={{ lineHeight: '1.8' }}>
              {product.negativeSentiment}
            </p>
          </div>

          {/* Benefits */}
          <div className="product-badges-row">
            <span className="info-badge">✅ Đã kiểm định an toàn</span>
            <span className="info-badge">🚚 Freeship đơn &gt;500k</span>
            <span className="info-badge">🔄 Đổi trả 7 ngày</span>
          </div>

          {/* Qty + Add to Cart */}
          <div className="detail-cart-row">
            <div className="qty-controls" style={{ transform: 'scale(1.1)' }}>
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-value" style={{ minWidth: '2.5rem' }}>{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              id={`detail-add-cart-${product.id}`}
              className={`btn-primary ${added ? 'btn-added' : ''}`}
              style={{ flex: 1, fontSize: '1rem', padding: '0.875rem 1.5rem' }}
              onClick={handleAddToCart}
            >
              {added ? '✓ Đã thêm vào giỏ!' : '🛒 Thêm vào giỏ hàng'}
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ marginTop: '4rem' }}>
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="related-grid">
            {related.map(rp => (
              <div key={rp.id} className="glass-card" style={{ padding: '1rem', cursor: 'pointer' }} onClick={() => navigate(`/product/${rp.id}`)}>
                <img src={rp.image} alt={rp.sku} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.75rem' }} />
                <span className="text-xs text-muted">{rp.brand}</span>
                <p className="font-bold">{rp.sku}</p>
                <p className="text-primary font-bold">{rp.price.toLocaleString()} ₫</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetailPage;
