import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setDrawerOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="nav-fixed">
      <div className={`nav-inner glass ${scrolled ? 'nav-scrolled' : ''}`} style={{ borderRadius: '16px', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.02em' }}>
            SHINEBEAM<span style={{ color: 'var(--secondary)' }}>BEAUTY</span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="md-flex" style={{ gap: '2rem', alignItems: 'center' }}>
          <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}>Trang chủ</NavLink>
          <NavLink to="/shop" className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}>Sản phẩm</NavLink>
          <NavLink to="/cart" className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}>Giỏ hàng</NavLink>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Cart Icon */}
          <button
            id="cart-icon-btn"
            className="cart-icon-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 7H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button className="md-hidden nav-hamburger" onClick={() => setMobileOpen(prev => !prev)} aria-label="Menu">
            <span className={`hamburger-line ${mobileOpen ? 'ham-open-1' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'ham-open-2' : ''}`} />
            <span className={`hamburger-line ${mobileOpen ? 'ham-open-3' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu glass" onClick={() => setMobileOpen(false)}>
          <NavLink to="/" className="mobile-nav-link">Trang chủ</NavLink>
          <NavLink to="/shop" className="mobile-nav-link">Sản phẩm</NavLink>
          <NavLink to="/cart" className="mobile-nav-link">Giỏ hàng</NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
