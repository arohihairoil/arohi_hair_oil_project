import React from "react";

const ShippingAndDeliveryPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Shipping & Delivery Policy
      </h1>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          Orders placed on <strong>Arohi Hair Oil</strong> are processed and
          shipped within a reasonable timeframe after order confirmation.
        </li>
        <li>
          Delivery is typically completed within{" "}
          <strong>5–7 business days</strong> from the date of dispatch,
          depending on the delivery location.
        </li>
        <li>
          We currently deliver products across <strong>India</strong>.
        </li>
        <li>
          Once the order is dispatched, tracking details will be shared with
          the customer via email or will be available in the{" "}
          <strong>Orders</strong> section of the website.
        </li>
      </ul>

      <div className="mt-6 p-4 border-l-4 border-blue-500 bg-blue-50">
        <p className="font-medium text-blue-700">
          Please Note
        </p>
        <p className="mt-2 text-lg">
          Delivery timelines may vary due to factors such as location,
          courier partner operations, weather conditions, or other
          unforeseen circumstances beyond our control.
        </p>
      </div>
    </div>
  );
};

export default ShippingAndDeliveryPolicy;
