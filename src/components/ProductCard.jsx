import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="glass-card p-4 h-full" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
      <div className="relative aspect-square mb-6 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.sku}
          className="w-full h-full object-cover"
          style={{ transition: 'transform 0.5s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <span className="product-badge product-badge-new">Mới</span>
          )}
          {product.brand === 'CeraVe' && (
            <span className="product-badge product-badge-hot">Hot</span>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs text-muted uppercase tracking-wider font-semibold">{product.brand}</span>
            <h3 className="text-lg font-bold tracking-tight">{product.sku}</h3>
          </div>
          <div className="flex items-center text-accent text-sm font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
            {product.rating}
          </div>
        </div>

        <p className="text-primary font-bold text-xl mb-4">
          {product.price.toLocaleString()} ₫
        </p>

        <div className="flex flex-col gap-2 mb-6 text-xs text-muted">
          <div className="flex justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>
            <span>Đã bán:</span>
            <span className="font-medium">{product.offtake} / tháng</span>
          </div>
          <div className="flex justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>
            <span>Quay lại mua:</span>
            <span className="font-medium">{product.retention}</span>
          </div>
        </div>

        <div className="sentiment-breakdown">
          <p className="text-xs italic leading-relaxed">
            <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '10px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Phân tích phản hồi</span>
            {product.negativeSentiment}
          </p>
        </div>
      </div>

      <button
        id={`add-to-cart-${product.id}`}
        onClick={handleAddToCart}
        className={`btn-add-cart w-full ${added ? 'btn-added' : ''}`}
      >
        {added ? '✓ Đã thêm!' : 'Thêm vào giỏ'}
      </button>
    </div>
  );
};

export default ProductCard;
