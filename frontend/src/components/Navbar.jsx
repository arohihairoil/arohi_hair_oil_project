import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItem = "flex flex-col text-[#D81B60] items-center gap-1 text-[20px]";
  const underline = "w-2/4 border-none h-[1.5px] bg-[#D81B60] hidden";

  return (
    <div className="relative z-50 flex items-center justify-between py-5 font-medium bg-white">
      {/* LOGO */}
      <Link to="/">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#D81B60]">
          AROHI HAIR OIL
        </h1>
      </Link>

      {/* NAV LINKS */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className={navItem}>
          <p>HOME</p>
          <hr className={underline} />
        </NavLink>
        <NavLink to="/collection" className={navItem}>
          <p>COLLECTION</p>
          <hr className={underline} />
        </NavLink>
        <NavLink to="/about" className={navItem}>
          <p>ABOUT</p>
          <hr className={underline} />
        </NavLink>
        <NavLink to="/contact" className={navItem}>
          <p>CONTACT</p>
          <hr className={underline} />
        </NavLink>
      </ul>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-6 relative">
        {/* SEARCH */}
        {/* <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        /> */}

        {/* PROFILE */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() =>
              token ? setProfileOpen(!profileOpen) : navigate("/login")
            }
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <img src={assets.profile_icon} className="w-5" alt="profile" />
          </button>

          {token && profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/myprofile");
                  setProfileOpen(false);
                }}
              >
                My Profile
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/orders");
                  setProfileOpen(false);
                }}
              >
                Orders
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* CART */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="cart" />
          <span className="absolute -right-2 -bottom-2 w-4 h-4 text-[10px] bg-black text-white flex items-center justify-center rounded-full">
            {getCartCount()}
          </span>
        </Link>

        {/* MOBILE MENU */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="p-4 cursor-pointer">
            ← Back
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 border-b"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 border-b"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 border-b"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="p-4 border-b"
            to="/contact"
          >
            CONTACT
          </NavLink>
          {!token && (
            <NavLink
              onClick={() => setVisible(false)}
              className="p-4 border-b"
              to="/login"
            >
              LOGIN
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
