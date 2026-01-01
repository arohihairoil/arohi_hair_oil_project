import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      {/* TITLE */}
      <div className="text-center py-8 text-2xl sm:text-3xl">
        <Title text1={"LATEST"} text2={"PRODUCTS"} />
      </div>

      {/* PRODUCTS GRID */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-4
          gap-y-6
        "
      >
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id} // ✅ IMPORTANT (stable key)
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
