
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹';
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // ✅ FIX 1: restore token from localStorage
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  );

  const navigate = useNavigate();

  // ✅ ADD TO CART
  const addToCart = async (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/add',
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const isInCart = (itemId) => {
    return !!cartItems[itemId];
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const getCartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const updateQuantity = async (itemId, quantity) => {
    const cartData = { ...cartItems };

    if (quantity <= 0) delete cartData[itemId];
    else cartData[itemId] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/update',
          { itemId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      const product = products.find(p => p._id === item);
      if (product) total += product.price * cartItems[item];
    }
    return total;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get',
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Load products once
  useEffect(() => {
    getProductsData();
  }, []);

  // ✅ FIX 2: load cart ONLY when token is available
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    isInCart,
    goToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
