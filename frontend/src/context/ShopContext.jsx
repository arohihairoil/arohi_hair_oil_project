
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import React from 'react'

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {

//   const currency = '₹';
//   const delivery_fee = 0;
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [search, setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);

//   // ✅ FIX 1: restore token from localStorage
//   const [token, setToken] = useState(
//     localStorage.getItem('token') || ''
//   );

//   const navigate = useNavigate();

//   // ✅ ADD TO CART
//   const addToCart = async (itemId) => {
//     const cartData = { ...cartItems };
//     cartData[itemId] = (cartData[itemId] || 0) + 1;
//     setCartItems(cartData);

//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + '/api/cart/add',
//           { itemId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   const isInCart = (itemId) => {
//     return !!cartItems[itemId];
//   };

//   const goToCart = () => {
//     navigate('/cart');
//   };

//   const getCartCount = () => {
//     let total = 0;
//     for (const item in cartItems) {
//       total += cartItems[item];
//     }
//     return total;
//   };

//   const updateQuantity = async (itemId, quantity) => {
//     const cartData = { ...cartItems };

//     if (quantity <= 0) delete cartData[itemId];
//     else cartData[itemId] = quantity;

//     setCartItems(cartData);

//     if (token) {
//       try {
//         await axios.post(
//           backendUrl + '/api/cart/update',
//           { itemId, quantity },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   const getCartAmount = () => {
//     let total = 0;
//     for (const item in cartItems) {
//       const product = products.find(p => p._id === item);
//       if (product) total += product.price * cartItems[item];
//     }
//     return total;
//   };

//   const getProductsData = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list');
//       if (response.data.success) {
//         setProducts(response.data.products.reverse());
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const getUserCart = async (userToken) => {
//     try {
//       const response = await axios.post(
//         backendUrl + '/api/cart/get',
//         {},
//         { headers: { Authorization: `Bearer ${userToken}` } }
//       );
//       if (response.data.success) {
//         setCartItems(response.data.cartData);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Load products once
//   useEffect(() => {
//     getProductsData();
//   }, []);

//   // ✅ FIX 2: load cart ONLY when token is available
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem('token', token);
//       getUserCart(token);
//     }
//   }, [token]);

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     isInCart,
//     goToCart,
//     updateQuantity,
//     getCartCount,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     setToken,
//     token,
//     setCartItems
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;


import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // ✅ Restore cart from localStorage (guest-safe)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [products, setProducts] = useState([]);

  // ✅ Restore token safely
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  /* ---------------- CART PERSISTENCE ---------------- */

  // ✅ Persist cart always
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ---------------- PRODUCT DATA ---------------- */

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  /* ---------------- CART ACTIONS ---------------- */

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const increaseQty = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const decreaseQty = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const updateQuantity = async (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) delete updated[itemId];
      else updated[itemId] = quantity;
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  /* ---------------- CART HELPERS ---------------- */

  const isInCart = (itemId) => !!cartItems[itemId];

  const getCartCount = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  const getCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      const product = products.find((p) => p._id === item);
      if (product) total += product.price * cartItems[item];
    }
    return total;
  };

  const goToCart = () => navigate("/cart");

  /* ---------------- LOGIN CART MERGE ---------------- */

  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (response.data.success) {
        setCartItems((prev) => ({
          ...prev, // 👈 keep guest cart
          ...response.data.cartData, // 👈 merge backend cart
        }));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUserCart(token);
    }
  }, [token]);

  /* ---------------- CONTEXT VALUE ---------------- */

  const logoutUser = () => {
    setToken("");
    setCartItems({});
    localStorage.removeItem("token");
    navigate("/login");
  };
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
    increaseQty,
    decreaseQty,
    updateQuantity,
    isInCart,
    getCartCount,
    getCartAmount,
    goToCart,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    logoutUser,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

