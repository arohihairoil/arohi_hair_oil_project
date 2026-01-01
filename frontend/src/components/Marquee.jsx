import React from "react";

const Marquee = () => {
  return (
    <div
      className="
        w-full overflow-hidden
        bg-pink-50
        py-2
        select-none
      "
      aria-label="Promotional information"
    >
      {/* Track */}
      <div
        className="
          flex whitespace-nowrap
          animate-marquee
          will-change-transform
        "
      >
        {/* Duplicate content for seamless loop */}
        <span className="mx-8 text-[#D81B60] font-semibold text-sm sm:text-lg">
          🌿 Welcome to AROHI HAIR OIL
        </span>

        <span className="mx-8 text-[#D81B60] font-semibold text-sm sm:text-lg">
          100% Natural Hair Oil & Shampoo
        </span>

        <span className="mx-8 text-[#D81B60] font-semibold text-sm sm:text-lg">
          Most Powerful Natural Ingredients
        </span>

        <span className="mx-8 text-[#D81B60] font-semibold text-sm sm:text-lg">
          ✨ Made in INDIA
        </span>

        {/* DUPLICATE (important for smooth infinite scroll) */}
        <span className="mx-8 text-[#D81B60] font-semibold text-sm sm:text-lg">
          🌿 Welcome to AROHI HAIR OIL
        </span>

        <span className="mx-8 text-[#D81B60] font-semibold text-sm sm:text-lg">
          100% Natural Hair Oil & Shampoo
        </span>

        <span className="mx-8 text-[#D81B60] font-semibold text-sm sm:text-lg">
          Most Powerful Natural Ingredients
        </span>

        <span className="mx-8 text-[#D81B60] font-semibold text-sm sm:text-lg">
          ✨ Made in INDIA
        </span>
      </div>
    </div>
  );
};

export default Marquee;
