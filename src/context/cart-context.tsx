
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
    id: string; // A unique ID for the cart item, e.g., `${menuItemId}-${optionName}`
    menuItemId: string; // The original ID of the menu item
    name: string;
    price: number;
    quantity: number;
    imageId: string;
    option: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
    const cartItemId = `${item.menuItemId}-${item.option}`;
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === cartItemId);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        );
      }
      return [...prevItems, { ...item, id: cartItemId, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(i => i.id === id);
        if (existingItem && existingItem.quantity > 1) {
            return prevItems.map(i =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            );
        }
        return prevItems.filter(i => i.id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
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
