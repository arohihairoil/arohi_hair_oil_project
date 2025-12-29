import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[2.5fr_2fr_1.5fr_1.5fr] gap-14 my-10 mt-40 text-sm">
        {/* 1️⃣ Brand Column */}
        <div>
          <img
            src={assets.Footer_Title_image}
            className="mb-5 w-32"
            alt="Footer Title"
          />
          <p className="w-full md:w-2/3 text-gray-600 text-[19px]">
            An Oil is Beneficial for All Hair Types
          </p>
          <p className="w-full md:w-2/3 text-gray-600 text-[19px]">
            Included 16 Natural Herbs
          </p>
          <p className="w-full md:w-2/3 text-gray-600 text-[19px]">
            Natural Ayurvedic Hair Growth Oil
          </p>
        </div>

        {/* 2️⃣ Address Column */}
        <div>
          <p className="text-xl font-medium mb-5 text-[#D81B60] text-[20px]">
            REGISTERED ADDRESS
          </p>
          <p className="text-gray-600 leading-relaxed">
            Arohi Hair Oil
            <br />
            D.No. 4-2-70/A, D.B Colony,
            <br />
            Hindupur, Sri Sathya Sai District,
            <br />
            Andhra Pradesh – 515201,
            <br />
            India
          </p>
        </div>

        {/* 3️⃣ Policies Column */}
        <div>
          <p className="text-xl font-medium mb-5 text-[#D81B60] text-[20px]">
            AROHI
          </p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <NavLink to="/payment-policy">Payment Policy</NavLink>
            </li>
            <li>
              <NavLink to="/refund-policy">Refund Policy</NavLink>
            </li>
            <li>
              <NavLink to="/return-policy">Return Policy</NavLink>
            </li>
            <li>
              <NavLink to="/shipping-policy">Shipping Policy</NavLink>
            </li>
            <li>
              <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to="/terms-and-conditions">Terms & Conditions</NavLink>
            </li>
            <li>
              <NavLink to="/disclaimer">Disclaimer</NavLink>
            </li>
          </ul>
        </div>

        {/* 4️⃣ Contact Column */}
        <div>
          <p className="text-xl font-medium mb-5 text-[#D81B60] text-[20px]">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              Chat with us:&nbsp;
              <a
                href="https://wa.me/917207085598"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +91 7207085598
              </a>
            </li>
            <li>
              Email:&nbsp;
              <a
                href="mailto:arohihairoilsra@gmail.com"
                className="hover:underline"
              >
                arohihairoilsra@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="py-5 text-lg text-center text-[20px]">
        © 2025 <b className="text-[#D81B60]">AROHI HAIR OIL</b>. All Rights
        Reserved.
      </p>
    </div>
  );
};

export default Footer;
