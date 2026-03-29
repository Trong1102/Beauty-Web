import React, { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGE = {
  from: 'bot',
  text: 'Xin chào quý khách! 🌸 Chào mừng bạn đến với SHINEBEAMBEAUTY. Tôi có thể giúp bạn tìm sản phẩm phù hợp hoặc giải đáp thắc mắc về skincare. Bạn cần hỗ trợ gì ạ?',
};

const BOT_REPLIES = [
  'Bạn có thể cho tôi biết loại da của bạn không? (da dầu, da khô, da hỗn hợp, da nhạy cảm)',
  'Sản phẩm bán chạy nhất của chúng tôi hiện tại là Office Worker Moisturizer 🌟 Bạn muốn xem thêm không?',
  'Chúng tôi có chính sách đổi trả 7 ngày và freeship cho đơn trên 500.000₫ 🚚',
  'Tôi sẽ chuyển bạn đến bộ phận tư vấn viên để được hỗ trợ chi tiết hơn nhé!',
  'Cảm ơn bạn đã liên hệ SHINEBEAMBEAUTY! Chúng tôi luôn sẵn sàng hỗ trợ bạn 💕',
];

const getReply = (text) => {
  const t = text.toLowerCase();
  if (t.match(/da dầu|nhờn|bóng/))
    return 'Với da dầu, bạn nên dùng sữa rửa mặt dạng gel nhẹ như Simple Refreshing Gel hoặc Zakka Calendula pH 5.5 để kiểm soát bã nhờn mà không làm khô da 🧴';
  if (t.match(/da khô|khô da|bong tróc/))
    return 'Với da khô, Office Worker Moisturizer của chúng tôi là lựa chọn hoàn hảo — dưỡng ẩm sâu suốt 12 tiếng, rating 4.9⭐ từ khách hàng 💧';
  if (t.match(/da hỗn hợp|hỗn hợp/))
    return 'Da hỗn hợp cần cân bằng độ ẩm. Cocoon Winter Melon hoặc CeraVe Foaming đều phù hợp. Bạn muốn tôi so sánh chi tiết không? 🌿';
  if (t.match(/da nhạy cảm|nhạy cảm|kích ứng/))
    return 'Da nhạy cảm nên ưu tiên sản phẩm không hương liệu. Zakka Calendula pH 5.5 với pH cân bằng 5.5 rất dịu nhẹ cho da nhạy cảm ✨';
  if (t.match(/giá|bao nhiêu|tiền/))
    return 'Sản phẩm của chúng tôi từ 115.000₫ đến 385.000₫. Freeship cho đơn trên 500.000₫ 🚚 Bạn muốn xem sản phẩm nào?';
  if (t.match(/ship|giao hàng|vận chuyển/))
    return 'Chúng tôi giao hàng toàn quốc 🚚 Miễn phí ship cho đơn trên 500.000₫. Thời gian giao 2–4 ngày làm việc.';
  if (t.match(/đổi trả|hoàn tiền|trả hàng/))
    return 'Chính sách đổi trả 7 ngày kể từ ngày nhận hàng. Hoàn tiền 100% nếu sản phẩm lỗi hoặc không đúng mô tả 🔄';
  if (t.match(/khuyến mãi|giảm giá|voucher|ưu đãi/))
    return 'Đăng ký email nhận ngay voucher giảm 10% cho lần mua đầu tiên! Ngoài ra thường xuyên có flash sale trên Facebook & TikTok 🎁';
  if (t.match(/sản phẩm|mua|tư vấn|chọn/))
    return 'Bạn có thể cho tôi biết loại da và vấn đề da đang gặp phải không? (da dầu, da khô, mụn, thâm...) để tôi tư vấn chính xác hơn 🌸';
  if (t.match(/mụn|acne|nổi mụn/))
    return 'Với da mụn, nên dùng sữa rửa mặt có pH thấp như Zakka Calendula pH 5.5 để không làm mất cân bằng da. Tránh sản phẩm có hương liệu mạnh 🌿';
  if (t.match(/thành phần|ingredient|niacinamide|retinol/))
    return 'Các sản phẩm của chúng tôi đều được kiểm định lâm sàng, không chứa paraben và hương liệu gây kích ứng. Bạn muốn biết thành phần sản phẩm cụ thể nào? 🔬';
  if (t.match(/xin chào|hello|hi|chào/))
    return 'Xin chào quý khách! 😊 Tôi có thể giúp gì cho bạn hôm nay? Tư vấn sản phẩm, chính sách giao hàng hay thông tin khuyến mãi?';
  if (t.match(/cảm ơn|thanks|thank/))
    return 'Không có gì ạ! Rất vui được hỗ trợ bạn 💕 Nếu cần thêm thông tin, đừng ngại hỏi nhé!';
  if (t.match(/liên hệ|hotline|điện thoại|email/))
    return 'Bạn có thể liên hệ chúng tôi qua:\n📞 1800 xxxx xxxx (miễn phí)\n📧 hello@shinebeambeauty.vn\n🕐 T2–T7: 8:00–20:00';
  // fallback
  const fallbacks = BOT_REPLIES;
  return fallbacks[replyIndex++ % fallbacks.length];
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, typing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getReply(text) }]);
    }, 1000);
  };

  const handleKey = (e) => { if (e.key === 'Enter') sendMessage(); };

  return (
    <div className="chatbot-wrapper">
      {/* Chat window */}
      <div className={`chatbot-window glass ${open ? 'chatbot-open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-avatar">J</div>
          <div>
            <p className="font-bold text-sm">Jacob</p>
            <p className="text-xs" style={{ opacity: 0.8 }}>Trợ lý SHINEBEAMBEAUTY</p>
          </div>
          <button className="chatbot-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg ${msg.from === 'bot' ? 'chatbot-msg-bot' : 'chatbot-msg-user'}`}>
              {msg.text}
            </div>
          ))}
          {typing && (
            <div className="chatbot-msg chatbot-msg-bot chatbot-typing">
              <span /><span /><span />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chatbot-input-row">
          <input
            className="chatbot-input"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="chatbot-send" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      {/* Toggle button */}
      <button className="chatbot-fab" onClick={() => setOpen(prev => !prev)} aria-label="Chat">
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="3"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="10" r="1" fill="currentColor"/><circle cx="16" cy="10" r="1" fill="currentColor"/><path d="M8 16v2l-3 2h14l-3-2v-2"/></svg>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
