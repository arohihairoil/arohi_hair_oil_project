import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div
      className="
        flex flex-col sm:flex-row
        border border-gray-300
        gap-3 sm:gap-5
        mt-[5px]
        overflow-hidden
      "
    >
      {/* LEFT IMAGE */}
      <img
        src={assets.Latest_collection}
        alt="Arohi Hair Oil Latest Collection"
        className="
          w-full
          sm:w-1/2

          /* MOBILE */
          h-auto
          object-contain

          /* DESKTOP */
          sm:h-[420px]
          sm:object-cover
        "
        loading="eager"
        fetchPriority="high"
      />

      {/* RIGHT IMAGE */}
      <img
        src={assets.about_product}
        alt="Arohi Hair Oil Product Overview"
        className="
          w-full
          sm:w-1/2

          /* MOBILE */
          h-auto
          object-contain

          /* DESKTOP */
          sm:h-[420px]
          sm:object-cover
        "
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};

export default Hero;
