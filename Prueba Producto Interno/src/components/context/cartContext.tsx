// context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { TypeoFProduct } from '@/components/types/Product'

const STORAGE_KEY = 'cart_items';

interface CartContextType {
  cart: TypeoFProduct[];
  addToCart: (product: TypeoFProduct) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<TypeoFProduct[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: TypeoFProduct) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id && p.size === product.size);
      if (existing) {
        return prev.map(p =>
          p.id === product.id && p.size === product.size
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};