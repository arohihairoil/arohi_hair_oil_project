import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment, // ✅ already present
              paymentMethod: order.paymentMethod,
              createdAt: order.createdAt,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrderData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {loading && (
        <p className="text-center text-gray-500 mt-6">Loading orders...</p>
      )}

      {!loading && orderData.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          You have no orders yet.
        </p>
      )}

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* LEFT SIDE */}
            <div className="flex items-start gap-6 text-sm">
              {item.image && (
                <img
                  src={item.image[0]}
                  alt={item.name}
                  loading="lazy" // ✅ lazy load
                  decoding="async" // ✅ faster render
                  className="
      w-14 h-14
      sm:w-20 sm:h-20
      object-cover
      rounded
      border
      flex-shrink-0
    "
                />
              )}

              <div>
                <p className="sm:text-base font-medium">{item.name}</p>

                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>

                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </p>

                <p className="text-gray-600 mt-1">
                  Time: {new Date(item.createdAt).toLocaleTimeString("en-IN")}
                </p>

                {/* ✅ PAYMENT STATUS (NEW – UI ONLY) */}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.payment ? "bg-green-500" : "bg-orange-500"
                    }`}
                  ></span>

                  <p
                    className={`text-sm font-medium ${
                      item.payment ? "text-green-600" : "text-orange-600"
                    }`}
                  >
                    {item.payment ? "Payment Done" : "Payment Pending"}
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Method: {item.paymentMethod}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>

              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Refresh
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
