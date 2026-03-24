import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (book) => {
    setCart((prevCart) => {
      // Check if book already exists in cart
      const existingItem = prevCart.find((item) => item._id === book._id);
      
      if (existingItem) {
        // Increment quantity if it exists, subject to stock limits
        if (existingItem.quantity >= book.stockQuantity) {
            alert(`You cannot add more than ${book.stockQuantity} items. This item is out of stock.`);
            return prevCart;
        }
        return prevCart.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new book with quantity 1
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  // Remove item entirely from cart
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== bookId));
  };

  // Update specific quantity of an item
  const updateQuantity = (bookId, newQuantity, stockQuantity) => {
    if (newQuantity < 1) return; // Prevent 0 or negative quantities
    
    if (newQuantity > stockQuantity) {
      alert(`Only ${stockQuantity} items in stock.`);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear entire cart (e.g., after checkout)
  const clearCart = () => setCart([]);

  // Calculate total number of items
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
