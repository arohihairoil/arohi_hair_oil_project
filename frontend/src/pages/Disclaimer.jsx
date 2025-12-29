import React from "react";

const Disclaimer = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Disclaimer
      </h1>

      <p className="mb-4 text-lg">
        The products offered by <strong>Arohi Hair Oil</strong> are made using
        natural and Ayurvedic ingredients and are intended for external use
        only.
      </p>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          This oil is suitable for all hair types.
        </li>
        <li>
          Our products are not intended to diagnose, treat, cure, or prevent
          any medical condition.
        </li>
        <li>
          Customers are advised to perform a patch test before regular use.
        </li>
        <li>
          We are not responsible for any allergic reactions or misuse of the
          product.
        </li>
      </ul>

      <p className="mt-6 text-lg">
        For any concerns or queries, please contact our support team before
        using the product.
      </p>
    </div>
  );
};

export default Disclaimer;
