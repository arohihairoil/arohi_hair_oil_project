// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'

// const ProductItem = ({ id, image, name, price }) => {

//   const { currency, addToCart, isInCart, goToCart } = useContext(ShopContext)

//   return (
//     <div className='text-gray-700 cursor-pointer'>

//       <Link onClick={() => scrollTo(0, 0)} to={`/product/${id}`}>
//         <div className='overflow-hidden'>
//           <img className='w-full h-60 object-cover hover:scale-110 transition ease-in-out' src={image[0]} alt="product images" />

//         </div>
//         <p className='pt-3 pb-1 text-sm'>{name}</p>
//         <p className='text-sm font-medium'>{currency}{price}</p>
//       </Link>

//       {isInCart(id) ? (
//         <button onClick={goToCart} className='bg-black text-white px-8 py-3 text-sm mt-6'>
//           Go to Cart
//         </button>
//       ) : (
//         <button onClick={() => addToCart(id)} className='bg-black text-white px-8 py-3 text-sm mt-6'>
//           Add to Cart
//         </button>
//       )}
//     </div>
//   )
// }

// export default ProductItem

// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { Link } from "react-router-dom";

// const ProductItem = ({ id, image, name, price }) => {
//   const { currency, addToCart, isInCart, goToCart } = useContext(ShopContext);

//   const inCart = isInCart(id);

//   return (
//     <div className="text-gray-700 flex flex-col">
//       {/* Product Card */}
//       <Link onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`}>
//         <div className="overflow-hidden rounded">
//           <img
//             className="w-full h-60 object-cover transition-transform duration-300 hover:scale-110"
//             src={image[0]}
//             alt={name}
//           />
//         </div>

//         <p className="pt-3 pb-1 text-sm font-medium">{name}</p>
//         <p className="text-sm">
//           {currency}
//           {price}
//         </p>
//       </Link>

//       {/* Button Wrapper (prevents jump) */}
//       <div className="mt-5">
//         {inCart ? (
//           <button
//             onClick={goToCart}
//             className="w-full h-11 border-2 border-green-600 text-green-600
//                        font-medium text-sm rounded
//                        text-[#D81B60] "
//           >
//             Go to Cart
//           </button>
//         ) : (
//           <button
//             onClick={() => addToCart(id)}
//             className="w-full h-11 bg-black text-white
//                        font-medium text-sm rounded
//                        hover:bg-gray-800 transition"
//           >
//             Add to Cart
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductItem;

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
      {/* Product */}
      <Link onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`}>
        <div className="overflow-hidden rounded">
          <img
            className="w-full h-60 object-cover transition-transform duration-300 hover:scale-110"
            src={image[0]}
            alt={name}
          />
        </div>

        <p className="pt-3 pb-1 text-sm font-medium">{name}</p>
        <p className="text-sm font-semibold">
          {currency}
          {price}
        </p>
      </Link>

      {/* Buttons */}
      <div className="mt-4 flex items-center gap-2">
        {!inCart ? (
          <button
            onClick={() => addToCart(id)}
            className="flex-1 h-9 bg-[#D81B60] text-white text-sm font-medium rounded
                       hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        ) : (
          <>
            <button
              onClick={goToCart}
              className="flex-1 h-9 border border-[#D81B60] text-[#D81B60]
                         text-sm font-medium rounded
                         hover:bg-[#D81B60] hover:text-white transition"
            >
              Go to Cart
            </button>

            <button
              onClick={() => updateQuantity(id, 0)}
              title="Remove from cart"
              className="h-9 w-9 flex items-center justify-center
                         border border-gray-300 rounded
                         text-gray-500 hover:text-red-600 hover:border-red-600 transition"
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
