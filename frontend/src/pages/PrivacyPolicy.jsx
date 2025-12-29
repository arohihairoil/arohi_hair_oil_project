import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Privacy Policy
      </h1>

      <p className="mb-4 text-lg">
        At <strong>Arohi Hair Oil</strong>, we value your privacy and are
        committed to protecting your personal information.
      </p>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          We collect personal details such as name, contact number, email
          address, and shipping address only for order processing and delivery.
        </li>
        <li>
          Payment-related information is processed securely through trusted
          third-party payment gateways such as <strong>Razorpay</strong>. We do
          not store card or UPI details.
        </li>
        <li>
          Customer information is used strictly for order fulfillment,
          communication, and customer support.
        </li>
        <li>
          We do not sell, rent, or share your personal information with any
          third parties except where required to complete your order.
        </li>
        <li>
          By using our website, you consent to the collection and use of
          information as outlined in this policy.
        </li>
      </ul>

      <p className="mt-6 text-lg">
        If you have any questions regarding our privacy practices, please
        contact us at <strong>arohihairoilsra@gmail.com</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
