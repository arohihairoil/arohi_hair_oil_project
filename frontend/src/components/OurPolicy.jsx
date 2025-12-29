// import React from "react";
// import { FaCreditCard, FaUndoAlt, FaShippingFast } from "react-icons/fa";

// const OurPolicy = () => {
//   return (
//     <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
//       {/* PAYMENT POLICY */}
//       <div>
//         <FaCreditCard className="m-auto mb-2 text-xl" />
//         <p className="font-semibold text-[#D81B60]">
//           <b>PAYMENT POLICY</b>
//         </p>
//         <p className="text-gray-500">Prepaid payments only</p>
//         <p className="text-gray-500">
//           UPI and online payment methods supported
//         </p>
//         <p className="text-gray-500">Cash on Delivery (COD) is not available</p>
//         <p className="text-gray-500">
//           <b>Note:</b> Orders are processed immediately after confirmation.
//           <br />
//           Eligible concerns are handled as per our Cancellation & Refund Policy.
//         </p>
//       </div>

//       {/* CANCELLATION & REFUND POLICY */}
//       <div>
//         <FaUndoAlt className="m-auto mb-2 text-xl" />
//         <p className="font-semibold text-[#D81B60]">
//           <b>CANCELLATION & REFUND</b>
//         </p>
//         <p className="text-gray-500">
//           Refunds or replacements may be provided for products damaged during
//           transit
//         </p>
//         <p className="text-gray-500">
//           or found to be expired at the time of delivery
//         </p>
//         <p className="text-gray-500">
//           Other cases are handled according to our policy guidelines
//         </p>
//       </div>

//       {/* SHIPPING & DELIVERY POLICY */}
//       <div>
//         <FaShippingFast className="m-auto mb-2 text-xl" />
//         <p className="font-semibold text-[#D81B60]">
//           <b>SHIPPING & DELIVERY</b>
//         </p>
//         <p className="text-gray-500">
//           Delivery is usually completed within 5–7 business days across India
//         </p>
//         <p className="text-gray-500">
//           Tracking details will be available in the Orders section once the
//           order is dispatched.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OurPolicy;

import React from "react";
import { FaCreditCard, FaUndoAlt, FaShippingFast } from "react-icons/fa";

const OurPolicy = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-20 text-center text-sm md:text-base text-gray-700">
      {/* PAYMENT POLICY */}
      <div className="border rounded-lg p-6 flex flex-col items-center gap-3">
        <FaCreditCard className="text-2xl text-[#D81B60]" />
        <h3 className="font-semibold text-[#D81B60] text-lg">PAYMENT POLICY</h3>
        <p className="text-gray-500">Prepaid payments only</p>
        <p className="text-gray-500">
          UPI and online payment methods supported
        </p>
        <p className="text-gray-500">Cash on Delivery (COD) is not available</p>
        <p className="text-gray-500 mt-2 text-sm">
          <b>Note:</b> Orders are processed immediately after confirmation.
          Eligible concerns are handled as per our Cancellation & Refund Policy.
        </p>
      </div>

      {/* CANCELLATION & REFUND POLICY */}
      <div className="border rounded-lg p-6 flex flex-col items-center gap-3">
        <FaUndoAlt className="text-2xl text-[#D81B60]" />
        <h3 className="font-semibold text-[#D81B60] text-lg">
          CANCELLATION & REFUND
        </h3>
        <p className="text-gray-500">
          Refunds or replacements may be provided for products damaged during
          transit
        </p>
        <p className="text-gray-500">
          or found to be expired at the time of delivery
        </p>
        <p className="text-gray-500">
          Other cases are handled according to our policy guidelines
        </p>
      </div>

      {/* SHIPPING & DELIVERY POLICY */}
      <div className="border rounded-lg p-6 flex flex-col items-center gap-3">
        <FaShippingFast className="text-2xl text-[#D81B60]" />
        <h3 className="font-semibold text-[#D81B60] text-lg">
          SHIPPING & DELIVERY
        </h3>
        <p className="text-gray-500">
          Delivery is usually completed within 5–7 business days across India
        </p>
        <p className="text-gray-500">
          Tracking details will be available in the Orders section once the
          order is dispatched
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
