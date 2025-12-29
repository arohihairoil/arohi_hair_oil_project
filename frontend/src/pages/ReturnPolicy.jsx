import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">
        Return Policy
      </h1>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          Returns are allowed <strong>only if the product is damaged</strong>.
        </li>
        <li>
          Products damaged during shipping or found to be
          <strong> expired at the time of delivery</strong> are eligible for return.
        </li>
        <li>
          <strong>No returns</strong> will be accepted for personal choice,
          preference, or dissatisfaction.
        </li>
      </ul>

      <div className="mt-6 p-4 border-l-4 border-yellow-500 bg-yellow-50">
        <p className="font-medium text-yellow-700">
          Important Note
        </p>
        <p className="mt-2 text-lg">
          Customers are advised to check the product immediately upon delivery
          and report any issues at the earliest.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
