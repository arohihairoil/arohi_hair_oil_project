import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Marquee from "./Marquee";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { getCartCount, navigate, token, logoutUser } = useContext(ShopContext);

  /* ---------------- CLOSE PROFILE DROPDOWN ---------------- */
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
    <div>
      {/* TOP MARQUEE */}
      <Marquee />

      {/* NAVBAR */}
      <div className="relative z-50 flex items-center justify-between py-5 font-medium bg-white px-4 sm:px-8">
        {/* LOGO */}
        <Link to="/">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#D81B60]">
            AROHI HAIR OIL
          </h1>
        </Link>

        {/* DESKTOP NAV LINKS */}
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
          {/* PROFILE (DESKTOP) */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
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
                    navigate("/profile");
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
                  onClick={logoutUser}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
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

          {/* MOBILE MENU ICON */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="menu"
          />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700">
          <div
            onClick={() => setVisible(false)}
            className="p-4 cursor-pointer font-semibold"
          >
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

          {/* MOBILE AUTH OPTIONS */}
          {!token && (
            <NavLink
              onClick={() => setVisible(false)}
              className="p-4 border-b"
              to="/login"
            >
              LOGIN
            </NavLink>
          )}

          {token && (
            <>
              <NavLink
                onClick={() => setVisible(false)}
                className="p-4 border-b"
                to="/profile"
              >
                MY PROFILE
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                className="p-4 border-b"
                to="/orders"
              >
                ORDERS
              </NavLink>

              <button
                onClick={() => {
                  logoutUser();
                  setVisible(false);
                }}
                className="p-4 text-left text-red-500 border-b"
              >
                LOGOUT
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
