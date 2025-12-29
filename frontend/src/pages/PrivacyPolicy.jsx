import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">Privacy Policy</h1>

      <p className="mb-4 text-lg">
        At <strong>Arohi Hair Oil</strong>, we respect your privacy and are
        committed to protecting the personal information you share with us.
      </p>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          We collect personal information such as your name, contact number,
          email address, and shipping address solely for the purpose of
          processing and delivering your orders.
        </li>
        <li>
          All payment transactions are processed securely through trusted
          third-party payment gateways, including <strong>Razorpay</strong>. We
          do not store or have access to your card, UPI, or banking details.
        </li>
        <li>
          Customer information is used strictly for order fulfillment,
          communication, and customer support.
        </li>
        <li>
          We do not sell, rent, or misuse your personal information. Data is
          shared only when required to complete your order or comply with legal
          obligations.
        </li>
        <li>
          By using our website, you consent to the collection and use of
          information as described in this Privacy Policy.
        </li>
      </ul>

      <p className="mt-6 text-lg">
        If you have any questions regarding this Privacy Policy, please contact
        us at <strong>arohihairoilsra@gmail.com</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
