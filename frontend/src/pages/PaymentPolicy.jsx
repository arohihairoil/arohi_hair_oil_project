import React from "react";

const PaymentPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">Payment Policy</h1>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          We accept <strong>prepaid payments only</strong> for all orders placed
          on the Arohi Hair Oil website.
        </li>
        <li>
          Supported payment methods include{" "}
          <strong>UPI and other online payment options</strong>.
        </li>
        <li>
          <strong>Cash on Delivery (COD)</strong> is currently not available.
        </li>
        <li>
          All payment transactions are processed securely through trusted
          third-party payment gateways such as <strong>Razorpay</strong>.
        </li>
      </ul>

      <div className="mt-6 p-4 border-l-4 border-red-500 bg-red-50">
        <p className="font-medium text-red-600">Important Note</p>
        <p className="mt-2 text-lg">
          Once an order is placed, it cannot be cancelled as the products are
          processed immediately for shipping. Any eligible refund or replacement
          requests will be handled as per our{" "}
          <strong>Cancellation & Refund Policy</strong>.
        </p>
      </div>
    </div>
  );
};

export default PaymentPolicy;
