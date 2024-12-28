import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const [couponDiscount, setCouponDiscount] = useState(0);
  const calculatePrice = (product) => {
    return product.price - product.price * product.discount;
  };

  const [couponCode, setCouponCode] = useState("");

  const addToCart = (cartItem) => {
    const existingItem = cartItems.find(item => item._id === cartItem._id);
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item._id === cartItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...cartItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const filterCarts = cartItems.filter((item) => {
      return productId !== item._id;
    });
    setCartItems(filterCarts);
    setCouponDiscount(0);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    const updatedItems = cartItems.map(item =>
      item._id === productId
        ? { ...item, quantity }
        : item
    );
    setCartItems(updatedItems);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addToCart: addToCart,
        setCartItems: setCartItems,
        removeFromCart,
        calculatePrice: calculatePrice,
        couponCode,
        setCouponCode,
        couponDiscount,
        setCouponDiscount,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
