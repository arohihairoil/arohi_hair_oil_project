import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
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

        <div>
          <p className="text-xl font-medium mb-5 text-[#D81B60] text-[22px]">
            AROHI{" "}
          </p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <NavLink onClick={() => setVisible(false)} to="/">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setVisible(false)} to="/about">
                ABOUT US
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setVisible(false)} to="/contact">
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-[#D81B60] text-[20px]">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {/* <li>+91 7207085598</li> */}
            <li>
              {" "}
              Chat with us : &nbsp;&nbsp;
              <a
                href="https://wa.me/917207085598?text=Welcome%20to%20Arohi%20Hair%20Oil!%20How%20can%20I%20help%20you%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +91 7207085598
              </a>
            </li>

            {/* <li>arohihairoilsra@gmail.com</li> */}
            <li>
              {" "}
              Email : &nbsp;&nbsp;
              <a
                href="mailto:arohihairoilsra@gmail.com?subject=Inquiry%20from%20Arohi%20Website&body=Hello%20Arohi%20Team,%0D%0A%0D%0AI%20would%20like%20to%20know%20more%20about%20your%20products.%0D%0A%0D%0AThank%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                arohihairoilsra@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-lg text-center text-[20px]">
          Copyright 2026@<b className="text-[#D81B60]"> AROHI HAIR OIL</b> - All
          Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
