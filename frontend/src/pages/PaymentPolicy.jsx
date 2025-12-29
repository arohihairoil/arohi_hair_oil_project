import React from "react";

const PaymentPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Payment Policy
      </h1>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          We accept <strong>prepaid payments only</strong>.
        </li>
        <li>
          Supported payment methods include <strong>UPI and online payments</strong>.
        </li>
        <li>
          <strong>Cash on Delivery (COD)</strong> is not available.
        </li>
      </ul>

      <div className="mt-6 p-4 border-l-4 border-red-500 bg-red-50">
        <p className="font-medium text-red-600">
          Important Note
        </p>
        <p className="mt-2 text-lg">
          Once an order is placed, it <strong>cannot be cancelled under any circumstances</strong>.
        </p>
      </div>
    </div>
  );
};

export default PaymentPolicy;
