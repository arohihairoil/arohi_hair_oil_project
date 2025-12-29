import React from "react";

const RefundPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Refund Policy
      </h1>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          <strong>No refunds</strong> will be provided once an order has been placed.
        </li>
        <li>
          We offer <strong>replacement only</strong> in cases where the product
          is found to be <strong>damaged during shipping</strong> or
          <strong> expired at the time of delivery</strong>.
        </li>
        <li>
          Refunds will <strong>not</strong> be issued for any other reasons,
          including personal preference or change of mind.
        </li>
      </ul>

      <div className="mt-6 p-4 border-l-4 border-orange-500 bg-orange-50">
        <p className="font-medium text-orange-700">
          Important Note
        </p>
        <p className="mt-2 text-lg">
          Customers are requested to inspect the product immediately upon
          delivery and contact us promptly in case of damage or expiry issues
          to request a replacement.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
