import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";

const MyProfile = () => {
  const { user } = useContext(ShopContext); 
  // ⬆️ user should contain { name, email }
  // password is NEVER fetched or shown

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded">
      <h1 className="text-2xl font-semibold text-[#D81B60] mb-6 text-center">
        My Profile
      </h1>

      {/* Name */}
      <div className="mb-4">
        <label className="text-sm text-gray-600">Name</label>
        <input
          type="text"
          value={user?.name || "User"}
          disabled
          className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          value={user?.email || "user@email.com"}
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

        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 cursor-pointer text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
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
