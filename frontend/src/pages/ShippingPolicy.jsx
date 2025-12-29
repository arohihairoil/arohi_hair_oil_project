import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Shipping Policy
      </h1>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          Orders are delivered within <strong>5–7 business days</strong>.
        </li>
        <li>
          Shipping is available across <strong>All India</strong>.
        </li>
        <li>
          Tracking details will be available in the
          <strong> Orders section</strong> once the order is dispatched.
        </li>
      </ul>

      <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
        <p className="font-medium text-blue-700">
          Please Note
        </p>
        <p className="mt-2 text-lg">
          Delivery timelines may vary slightly depending on location,
          courier partner, and unforeseen circumstances.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
