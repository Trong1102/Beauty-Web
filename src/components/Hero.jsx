import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero-banner.png';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section style={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src={heroImg} alt="Shinebeambeauty Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(253,251,251,0.95) 0%, rgba(253,251,251,0.6) 50%, transparent 100%)' }} />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '560px' }} className="animate-fade">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm" style={{ display: 'block', marginBottom: '1rem' }}>
            Cao cấp · An toàn · Hiệu quả
          </span>
          <h1 className="text-5xl font-bold" style={{ lineHeight: '1.15', marginBottom: '1.5rem' }}>
            Toả Sáng<br />
            <span className="text-primary">Vẻ Đẹp Tự Nhiên</span>
          </h1>
          <p className="text-lg text-muted" style={{ marginBottom: '2rem', lineHeight: '1.7' }}>
            Bộ sưu tập skincare cao cấp, được kiểm định lâm sàng. Phù hợp cho mọi loại da người Việt.
          </p>
          <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }} onClick={() => navigate('/shop')}>
              Mua sắm ngay →
            </button>
            <button className="btn-outline" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }} onClick={() => navigate('/shop')}>
              Khám phá sản phẩm
            </button>
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[['10K+', 'Khách hàng'], ['4.8★', 'Đánh giá'], ['100%', 'Kiểm định']].map(([val, label]) => (
              <div key={label}>
                <p className="font-bold text-xl text-primary">{val}</p>
                <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
