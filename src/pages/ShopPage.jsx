import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../utils/products';

const CATEGORIES = ['Tất cả', 'Simple', 'Cocoon', 'Zakka', 'CeraVe', 'Shinebeambeauty'];
const SORTS = [
  { label: 'Nổi bật', val: 'rating' },
  { label: 'Giá tăng dần', val: 'price_asc' },
  { label: 'Giá giảm dần', val: 'price_desc' },
];

const ShopPage = () => {
  const [filter, setFilter] = useState('Tất cả');
  const [sort, setSort] = useState('rating');
  const [search, setSearch] = useState('');

  const filtered = products
    .filter(p => filter === 'Tất cả' || p.brand === filter)
    .filter(p => p.sku.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return b.rating - a.rating;
    });

  return (
    <section className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="text-3xl font-bold mb-2">Tất cả sản phẩm</h1>
        <p className="text-muted">Khám phá {products.length} sản phẩm skincare cao cấp</p>
      </div>

      {/* Toolbar */}
      <div className="shop-toolbar">
        <div className="shop-search-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="search-icon-inner"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            id="shop-search"
            className="shop-search"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="shop-sort">
          <label className="text-sm text-muted">Sắp xếp:</label>
          <select id="shop-sort-select" className="form-input" style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }} value={sort} onChange={e => setSort(e.target.value)}>
            {SORTS.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Category filters */}
      <div className="brand-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-chip ${filter === cat ? 'filter-chip-active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '2rem' }}>🔍</p>
          <p className="font-semibold">Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <div className="product-grid-shop">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
};

export default ShopPage;
