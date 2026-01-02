import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { backendUrl, currency } = useContext(ShopContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ORDER ---------------- */
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/order/single/${orderId}`
        );

        if (data.success) {
          setOrder(data.order);
        }
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId, backendUrl]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Loading order details...
      </p>
    );
  }

  if (!order) {
    return (
      <p className="text-center mt-20 text-red-500">
        Order not found
      </p>
    );
  }

  return (
    <div className="min-h-[70vh] flex justify-center items-center px-4">
      <div className="max-w-2xl w-full border p-6 rounded-lg shadow">

        <h1 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Order Successful
        </h1>

        <p className="mb-2">
          <strong>Order ID:</strong> {order._id}
        </p>

        <p className="mb-4">
          <strong>Name:</strong> {order.address.firstName}{" "}
          {order.address.lastName}
        </p>

        {/* PRODUCTS */}
        <div className="border-t pt-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                {currency}
                {item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>
            {currency}
            {order.amount}
          </span>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-black text-white py-2 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
