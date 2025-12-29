// import React from "react";

// const TermsAndConditions = () => {
//   return (
//     <div className="py-10 max-w-4xl mx-auto text-gray-700">
//       <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
//         Terms & Conditions
//       </h1>

//       <p className="mb-4 text-lg">
//         By accessing and using the <strong>Arohi Hair Oil</strong> website, you
//         agree to comply with the following terms and conditions.
//       </p>

//       <ul className="list-disc pl-6 space-y-3 text-lg">
//         <li>
//           All products listed on our website are intended for personal use only.
//         </li>
//         <li>
//           Prices, product descriptions, and availability are subject to change
//           without prior notice.
//         </li>
//         <li>
//           Orders once placed cannot be cancelled or refunded, as mentioned in
//           our Payment and Refund policies.
//         </li>
//         <li>
//           We reserve the right to refuse or cancel any order in case of
//           incorrect pricing, stock issues, or suspected fraudulent activity.
//         </li>
//         <li>
//           Customers are responsible for providing accurate shipping and contact
//           details at the time of placing the order.
//         </li>
//       </ul>

//       <p className="mt-6 text-lg">
//         These terms shall be governed and interpreted in accordance with the
//         laws of India.
//       </p>
//     </div>
//   );
// };

// export default TermsAndConditions;

import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Terms & Conditions
      </h1>

      <p className="mb-4 text-lg">
        By accessing and using the <strong>Arohi Hair Oil</strong> website, you
        agree to be bound by the following terms and conditions. Please read
        them carefully before making a purchase.
      </p>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          Arohi Hair Oil offers hair oil and shampoo products intended for
          external use only and meant for regular personal care.
        </li>

        <li>
          Product prices, descriptions, and availability are subject to change
          without prior notice.
        </li>
        <li>
          Order cancellations, refunds, and returns are governed by our
          Cancellation & Refund Policy available on the website.
        </li>
        <li>
          We reserve the right to refuse or cancel any order in case of
          incorrect pricing, stock unavailability, or suspected fraudulent
          activity.
        </li>
        <li>
          Customers are responsible for providing accurate contact and shipping
          information while placing an order.
        </li>
        <li>
          Arohi Hair Oil shall not be held liable for any indirect or
          consequential damages arising from the use of the website or products.
        </li>
      </ul>

      <p className="mt-6 text-lg">
        These terms and conditions shall be governed by and interpreted in
        accordance with the laws of India.
      </p>
    </div>
  );
};

export default TermsAndConditions;
