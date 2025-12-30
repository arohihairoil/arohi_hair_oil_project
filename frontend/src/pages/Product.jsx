import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, isInCart, goToCart, updateQuantity } =
    useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  if (!productData) return null;

  return (
    <div className="border-t-2 pt-10 transition-opacity duration-500">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setImage(img)}
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer border"
                alt="product"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto rounded" src={image} alt="product" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-3" />
            ))}
            <p className="pl-2 text-sm">(5/5)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Description as points */}
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-600">
            {productData.description.split("\n").map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {/* Cart Actions */}
          <div className="mt-6 flex items-center gap-3">
            {!isInCart(productData._id) ? (
              <button
                onClick={() => addToCart(productData._id)}
                className="h-10 px-8 bg-[#D81B60] text-white text-sm font-medium rounded
                           hover:opacity-90 transition"
              >
                ADD TO CART
              </button>
            ) : (
              <>
                <button
                  onClick={goToCart}
                  className="h-10 px-8 border border-[#D81B60] text-[#D81B60]
                             text-sm font-medium rounded
                             hover:bg-[#D81B60] hover:text-white transition"
                >
                  GO TO CART
                </button>

                <button
                  onClick={() => updateQuantity(productData._id, 0)}
                  title="Remove from cart"
                  className="h-10 w-10 flex items-center justify-center
                             border border-gray-300 rounded
                             text-gray-500 hover:text-red-600 hover:border-red-600 transition"
                >
                  ✕
                </button>
              </>
            )}
          </div>

          <hr className="mt-8 sm:w-4/5" />

          {/* Info */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product made with natural ingredients.</p>
            <p>
              Easy return or replacement within 2 days if damaged or expired
              upon delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
