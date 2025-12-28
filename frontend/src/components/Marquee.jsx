import React from 'react'

const Marquee = () => {
  return (
    <div className="w-full overflow-hidden bg-pink-50 py-2">
      <div className="whitespace-nowrap flex animate-marquee">
        <span className="mx-8 text-[#D81B60] font-semibold text-lg">
          🌿 Welcome to AROHI HAIR OIL
        </span>
       
        <span className="mx-8 text-[#D81B60] font-semibold text-lg">
          100% Natural Hair Oil & Shampoo
        </span>
        
        <span className="mx-8 text-[#D81B60] font-semibold text-lg">
          Most PowerFul Natural Ingredients
        </span>
        
        <span className="mx-8 text-[#D81B60] font-semibold text-lg">
          ✨ Made in INDIA
        </span>
      </div>
    </div>
  )
}

export default Marquee
