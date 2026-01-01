import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div
      className="
        w-full
        flex flex-col sm:flex-row
        gap-3 sm:gap-1
        mt-[5px]
      "
    >
      {/* LEFT IMAGE */}
      <img
        src={assets.Latest_collection}
        alt="Arohi Hair Oil Latest Collection"
        className="
          w-full
          sm:w-1/2
          h-auto
          sm:h-[420px]
          object-contain
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
          h-auto
          sm:h-[420px]
          object-contain
        "
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
};

export default Hero;
