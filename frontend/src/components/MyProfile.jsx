import React, { useContext, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user, token } = useContext(ShopContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  /* ---------------- AUTH SAFETY ---------------- */
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  /* ---------------- LOADING STATE ---------------- */

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded bg-white">
      <h1 className="text-2xl font-semibold text-[#D81B60] mb-6 text-center">
        My Profile
      </h1>

      {/* Name */}
      <div className="mb-4">
        <label className="text-sm text-gray-600">Name</label>
        <input
          type="text"
          value={user.name}
          disabled
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Password */}
      <div className="mb-4 relative">
        <label className="text-sm text-gray-600">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value="********"
          disabled
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Password cannot be viewed or changed here for security reasons.
        <br />
        Use <b>Forgot Password</b> to reset it.
      </p>
    </div>
  );
};

export default MyProfile;
