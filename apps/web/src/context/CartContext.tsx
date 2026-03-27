'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  activityId: string;
  quantity: number;
  amount: number;
  activity: {
    title: string;
    image: string;
  };
}

interface Cart {
  items: CartItem[];
}

interface CartContextType {
  cart: Cart;
  loading: boolean;
  addToCart: (activity: any, amount: number, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalAmount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mina_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('mina_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (activity: any, amount: number, quantity: number = 1) => {
    setCart((prev) => {
      const existingItemIndex = prev.items.findIndex(
        (item) => item.activityId === activity.id && item.amount === amount
      );

      let newItems = [...prev.items];
      
      if (existingItemIndex >= 0) {
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems.push({
          id: `${activity.id}-${amount}-${Date.now()}`,
          activityId: activity.id,
          amount,
          quantity,
          activity: {
            title: activity.title,
            image: activity.image,
          }
        });
      }

      return { items: newItems };
    });
    
    toast.success('Added to basket');
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => ({
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const clearCart = () => {
    setCart({ items: [] });
    localStorage.removeItem('mina_cart');
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading: !isInitialized,
      addToCart, 
      removeFromCart, 
      clearCart, 
      itemCount, 
      totalAmount,
      isDrawerOpen,
      openDrawer,
      closeDrawer
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
