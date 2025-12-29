// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title'
// import { assets } from '../assets/assets'
// import CartTotal from '../components/CartTotal'

// const Cart = () => {

//   const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
//   const [cartData, setCartData] = useState([])

//   useEffect(() => {
//     if (products.length > 0) {
//       const tempData = []

//       for (const itemId in cartItems) {
//         if (cartItems[itemId] > 0) {
//           tempData.push({
//             _id: itemId,
//             quantity: cartItems[itemId]
//           })
//         }
//       }

//       setCartData(tempData)
//     }
//   }, [cartItems, products])

//   return (
//     <div className='border-t pt-14'>

//       <div className='text-2xl mb-3'>
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div>
//         {cartData.map((item, index) => {

//           const productData = products.find(
//             (product) => product._id === item._id
//           )

//           if (!productData) return null

//           return (
//             <div
//               key={index}
//               className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
//             >

//               <div className='flex items-start gap-6'>
//                 <img
//                   className='w-16 sm:w-20'
//                   src={productData.image[0]}
//                   alt=""
//                 />
//                 <div>
//                   <p className='text-xs sm:text-lg font-medium'>
//                     {productData.name}
//                   </p>
//                   <div className='flex items-center gap-5 mt-2'>
//                     <p>{currency}{productData.price}</p>
//                   </div>
//                 </div>
//               </div>

//               <input
//                 onChange={(e) =>
//                   updateQuantity(item._id, Number(e.target.value))
//                 }
//                 className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
//                 type="number"
//                 min={1}
//                 value={item.quantity}
//               />

//               <img
//                 onClick={() => updateQuantity(item._id, 0)}
//                 className='w-4 mr-4 sm:w-5 cursor-pointer'
//                 src={assets.bin_icon}
//                 alt=""
//               />

//             </div>
//           )
//         })}
//       </div>

//       <div className='flex justify-end my-20'>
//         <div className='w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className='w-full text-end'>
//             <button
//               onClick={() => navigate('/place-order')}
//               className='bg-black text-white text-sm my-8 px-8 py-3'
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Cart

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    increaseQty,
    decreaseQty,
    navigate,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!products.length) return;

    const data = Object.keys(cartItems).map((id) => ({
      _id: id,
      quantity: cartItems[id],
    }));

    setCartData(data);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Your cart is empty
        </p>
      ) : (
        cartData.map((item, index) => {
          const product = products.find((p) => p._id === item._id);
          if (!product) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b grid grid-cols-[4fr_1fr_0.5fr] items-center gap-4 text-gray-700"
            >
              <div className="flex gap-6">
                <img
                  src={product.image[0]}
                  className="w-16 sm:w-20"
                  alt={product.name}
                />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-2">
                    {currency}
                    {product.price}
                  </p>
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                >
                  −
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item._id)}
                  className="w-8 h-8 bg-[#D81B60] hover:bg-pink-700 text-white rounded text-lg"
                >
                  +
                </button>
              </div>

              <img
                src={assets.bin_icon}
                alt="Remove"
                onClick={() => decreaseQty(item._id)}
                className="w-5 cursor-pointer"
              />
            </div>
          );
        })
      )}

      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white px-8 py-3 mt-6"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

