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
  const [user, setUser] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  /* ---------------- CART PERSISTENCE ---------------- */
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
    let isMounted = true;
    const fetchProducts = async () => {
      if (isMounted) await getProductsData();
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
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
      if (updated[itemId] > 1) updated[itemId] -= 1;
      else delete updated[itemId];
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
  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      const product = products.find((p) => p._id === item);
      if (product) total += product.price * cartItems[item];
    }
    return total;
  };

  const goToCart = () => navigate("/cart");

  /* ---------------- USER CART ---------------- */
  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {}); // ✅ REPLACE, NOT MERGE
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------------- USER PROFILE ---------------- */
  const getUserProfile = async (userToken) => {
    try {
      const response = await axios.get(backendUrl + "/api/user/profile", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* 🔴 THIS WAS THE MISSING PART (NOW FIXED) */
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // getUserCart(token);
      getUserProfile(token); // ✅ REQUIRED
    } else {
      setUser(null); // ✅ clear on logout
    }
  }, [token]);

  /* ---------------- LOGOUT ---------------- */
  const logoutUser = () => {
    setToken("");
    setUser(null);
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
    getUserProfile,
    user,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;