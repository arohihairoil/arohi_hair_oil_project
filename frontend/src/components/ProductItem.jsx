import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart, isInCart, goToCart, updateQuantity } =
    useContext(ShopContext);

  const inCart = isInCart(id);

  return (
    <div className="text-gray-700 flex flex-col">
      {/* PRODUCT */}
      <Link onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`}>
        {/* IMAGE WRAPPER → PREVENT CLS */}
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded bg-gray-100">
          <img
            src={image[0]}
            alt={name}
            loading="lazy"
            decoding="async"
            className="
              absolute inset-0 w-full h-full
              object-cover
              transition-transform duration-300
              hover:scale-105
            "
          />
        </div>

        {/* TEXT */}
        <p className="pt-3 pb-1 text-sm font-medium line-clamp-2">{name}</p>
        <p className="text-sm font-semibold">
          {currency}
          {price}
        </p>
      </Link>

      {/* BUTTONS (FIXED HEIGHT → NO SHIFT) */}
      <div className="mt-4 h-10 flex items-center gap-2">
        {!inCart ? (
          <button
            onClick={() => addToCart(id)}
            className="
              flex-1 h-9
              bg-[#D81B60] text-white
              text-sm font-medium rounded
              hover:opacity-90 transition
            "
          >
            Add to Cart
          </button>
        ) : (
          <>
            <button
              onClick={goToCart}
              className="
                flex-1 h-9
                border border-[#D81B60] text-[#D81B60]
                text-sm font-medium rounded
                hover:bg-[#D81B60] hover:text-white
                transition
              "
            >
              Go to Cart
            </button>

            <button
              onClick={() => updateQuantity(id, 0)}
              title="Remove from cart"
              className="
                h-9 w-9
                flex items-center justify-center
                border border-gray-300 rounded
                text-gray-500
                hover:text-red-600 hover:border-red-600
                transition
              "
            >
              <FaTimes size={12} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
