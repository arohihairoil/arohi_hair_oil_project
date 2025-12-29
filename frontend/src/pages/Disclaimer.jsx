import React from "react";

const Disclaimer = () => {
  return (
    <div className="py-10 max-w-4xl mx-auto text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-[#D81B60]">Disclaimer</h1>

      <p className="mb-4 text-lg">
        The products offered by <strong>Arohi Hair Oil</strong> are made using
        carefully selected natural ingredients and are intended for external use
        only as part of regular personal care.
      </p>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>
          These products are not intended to diagnose, treat, cure, or prevent
          any disease or medical condition.
        </li>
        <li>
          Customers are advised to perform a patch test before regular use to
          check for any sensitivity or allergic reaction.
        </li>
        <li>
          Arohi Hair Oil shall not be held responsible for any adverse effects
          arising from improper use or individual sensitivity.
        </li>
      </ul>

      <p className="mt-6 text-lg">
        If you have any questions or concerns, please contact our support team
        before using the product.
      </p>
    </div>
  );
};

export default Disclaimer;
