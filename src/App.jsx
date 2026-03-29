import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-bg-light">
            <Navbar />
            <CartDrawer />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
              </Routes>

              {/* Footer */}
              <footer className="py-12 glass border-t mt-12">
                <div className="container">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">SHINEBEAMBEAUTY</h2>
                      <p className="text-muted text-sm" style={{ lineHeight: '1.8' }}>
                        Mỹ phẩm cao cấp, an toàn và hiệu quả. Mỗi sản phẩm đều được kiểm định kỹ lưỡng.
                      </p>
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                        {['Facebook', 'Instagram', 'TikTok'].map(s => (
                          <a key={s} href="#" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.1)', padding: '4px 10px', borderRadius: '20px' }}>{s}</a>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-4">Chăm sóc khách hàng</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Chính sách giao hàng</a>
                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Đổi trả & Hoàn tiền</a>
                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Câu hỏi thường gặp</a>
                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Chính sách bảo mật</a>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-4">Liên hệ</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <span>📞 1800 xxxx xxxx (miễn phí)</span>
                        <span>📧 hello@shinebeambeauty.vn</span>
                        <span>🕐 T2–T7: 8:00–20:00</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-4">Đăng ký nhận ưu đãi</h4>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="email"
                          placeholder="email@example.com"
                          style={{ flexGrow: 1, padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.875rem', outline: 'none' }}
                        />
                        <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>→</button>
                      </div>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Nhận voucher 10% cho lần mua đầu tiên!
                      </p>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    © 2026 SHINEBEAMBEAUTY VIETNAM. All rights reserved. | Giấy phép ĐKKD: 0123456789
                  </div>
                </div>
              </footer>
            </main>
            <ChatBot />
          </div>
        </BrowserRouter>
      </OrderProvider>
    </CartProvider>
  )
}

export default App
