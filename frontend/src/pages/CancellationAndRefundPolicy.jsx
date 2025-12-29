import React from "react";

const CancellationAndRefundPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Cancellation & Refund Policy
      </h1>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          Orders once placed cannot be cancelled as the products are processed
          immediately for shipping.
        </li>

        <li>
          Refunds are not normally offered. However, we may provide a
          replacement or refund in cases where the product is damaged during
          transit or found to be expired at the time of delivery.
        </li>

        <li>
          To be eligible for a replacement or refund, customers must notify us
          within <strong>48 hours</strong> of receiving the product along with
          relevant images or proof of the issue.
        </li>

        <li>
          Approved refunds, where applicable, will be processed within
          <strong> 5–7 business days</strong> to the original mode of payment.
        </li>

        <li>
          No refunds or replacements will be provided for reasons such as
          personal preference, dissatisfaction, or change of mind.
        </li>
      </ul>

      <div className="mt-6 p-4 border-l-4 border-orange-500 bg-orange-50">
        <p className="font-medium text-orange-700">
          Important Note
        </p>
        <p className="mt-2 text-lg">
          Customers are requested to inspect the product immediately upon
          delivery. For any eligible concerns, please contact us at{" "}
          <strong>arohihairoilsra@gmail.com</strong> within the specified
          timeframe.
        </p>
      </div>
    </div>
  );
};

export default CancellationAndRefundPolicy;
