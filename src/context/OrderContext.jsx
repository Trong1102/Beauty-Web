import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('luxe_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [lastOrder, setLastOrder] = useState(null);

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: 'LB-' + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    setLastOrder(newOrder);
    localStorage.setItem('luxe_orders', JSON.stringify(updated));
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, lastOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
};
