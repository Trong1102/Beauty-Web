import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />

      {/* Featured Products */}
      <section className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="text-primary font-semibold tracking-widest uppercase text-sm">Được yêu thích nhất</span>
          <h2 className="text-3xl font-bold" style={{ marginTop: '0.5rem' }}>Sản phẩm nổi bật</h2>
        </div>
        <div className="product-grid-shop">
          {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button className="btn-outline" style={{ padding: '0.875rem 2.5rem' }} onClick={() => navigate('/shop')}>
            Xem tất cả sản phẩm →
          </button>
        </div>
      </section>

      {/* Why choose us */}
      <section style={{ background: 'rgba(183,110,121,0.04)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="text-3xl font-bold">Tại sao chọn SHINEBEAMBEAUTY?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🔬', title: 'Kiểm định lâm sàng', desc: 'Mỗi sản phẩm được kiểm định bởi chuyên gia da liễu' },
              { icon: '🚚', title: 'Miễn phí vận chuyển', desc: 'Freeship toàn quốc cho đơn hàng trên 500.000₫' },
              { icon: '🔄', title: 'Đổi trả 7 ngày', desc: 'Không hài lòng? Hoàn tiền 100% trong 7 ngày' },
              { icon: '💬', title: 'Hỗ trợ 24/7', desc: 'Đội ngũ tư vấn viên luôn sẵn sàng hỗ trợ bạn' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 className="text-2xl font-bold mb-8">Thương hiệu đối tác</h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          {['Simple', 'Cocoon', 'Zakka', 'CeraVe'].map(brand => (
            <div key={brand} className="text-2xl font-bold uppercase tracking-widest" style={{ opacity: 0.25 }}>{brand}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
