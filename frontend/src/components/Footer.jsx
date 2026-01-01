import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaWhatsapp, FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[2.5fr_2fr_1.5fr_1.5fr] gap-14 my-10 mt-40 text-sm">
        {/* 1️⃣ Brand Column */}
        <div>
          <img
            src={assets.Footer_Title_image}
            className="mb-5 w-32"
            alt="Arohi Hair Oil"
            loading="lazy"
          />

          <p className="w-full md:w-2/3 text-gray-600 text-base">
            A gentle hair care oil formulated for regular use.
          </p>
          <p className="w-full md:w-2/3 text-gray-600 text-base">
            Crafted with carefully selected natural ingredients.
          </p>
          <p className="w-full md:w-2/3 text-gray-600 text-base">
            Natural-inspired hair oil for daily hair care.
          </p>
        </div>

        {/* 2️⃣ Address Column */}
        <div>
          <p className="text-xl font-medium mb-5 text-[#D81B60]">
            REGISTERED ADDRESS
          </p>
          <p className="text-gray-600 leading-relaxed">
            Arohi Enterprises
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
          <p className="text-xl font-medium mb-5 text-[#D81B60]">AROHI</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to="/terms-and-conditions">Terms & Conditions</NavLink>
            </li>
            <li>
              <NavLink to="/cancellation-and-return-policy">
                Cancellation & Return Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/shipping-and-delivery">Shipping & Delivery</NavLink>
            </li>
            <li>
              <NavLink to="/payment-policy">Payment Policy</NavLink>
            </li>
            <li>
              <NavLink to="/disclaimer">Disclaimer</NavLink>
            </li>
          </ul>
        </div>

        {/* 4️⃣ Contact Column */}
        <div>
          <p className="text-xl font-medium mb-5 text-[#D81B60]">
            GET IN TOUCH
          </p>

          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="flex items-center gap-3">
              <FaWhatsapp className="text-green-500 text-lg" />
              <a
                href="https://wa.me/917207085598"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +91 72070 85598
              </a>
            </li>

            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#D81B60] text-lg" />
              <a
                href="mailto:arohihairoilsra@gmail.com"
                className="hover:underline"
              >
                arohihairoilsra@gmail.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <FaInstagram className="text-pink-500 text-lg" />
              <a
                href="https://www.instagram.com/tulashi3277?igsh=NGFtemR4cXU1ODZv"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>

            <li className="flex items-center gap-3">
              <FaYoutube className="text-red-500 text-lg" />
              <a
                href="https://youtube.com/@roshanisra?si=9YEuH4RQsXZOr2ZF"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="py-5 text-center text-base text-gray-600">
        © 2026{" "}
        <span className="font-semibold text-[#D81B60]">AROHI HAIR OIL</span>.
        All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
