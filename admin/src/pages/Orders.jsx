import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  /* ---------------- FETCH ORDERS ---------------- */
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        console.log("Orders from backend:", response.data.orders);
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* ---------------- UPDATE STATUS ---------------- */
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  /* ---------------- ONLY PAID ORDERS ---------------- */
  const paidOrders = orders.filter((order) => order.payment === true);

  /* ---------------- GROUP DATE-WISE ---------------- */
  const groupedOrders = paidOrders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString("en-IN");
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Orders</h3>

      {Object.keys(groupedOrders).map((date) => (
        <div key={date}>
          {/* DATE HEADER */}
          <h4 className="mt-6 mb-3 font-semibold text-gray-700">{date}</h4>

          {groupedOrders[date].map((order, index) => (
            <div
              key={index}
              className="
                grid grid-cols-1
                md:grid-cols-[1.4fr_1.6fr_1fr]
                lg:grid-cols-[1.3fr_1.4fr_1fr_auto_auto]
                gap-4
                items-start
                border-2 border-gray-200
                p-5 md:p-6
                my-3
                text-xs sm:text-sm
                text-gray-700
              "
            >
              {/* PRODUCTS */}
              <div className="flex flex-col gap-3 max-w-[240px]">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="w-14 h-14 object-cover border rounded flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="font-medium break-words leading-snug">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CUSTOMER */}
              <div className="space-y-0.5 max-w-[260px]">
                <p className="font-medium break-words leading-snug">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-xs text-gray-600 break-words leading-snug">
                  {order.address.street},
                </p>
                <p className="text-xs text-gray-600 break-words leading-snug">
                  {order.address.city}, {order.address.state}
                </p>
                <p className="text-xs text-gray-600 break-words leading-snug">
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="text-xs text-gray-600">{order.address.phone}</p>
                <p className="text-xs text-gray-600">{order.address.email}</p>
              </div>

              {/* META */}
              <div className="space-y-0.5">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>

                {/* PAYMENT BADGE */}
                <div className="flex items-center gap-2 mt-1">
                  <FaCheckCircle className="text-green-600" />
                  <span className="text-green-700 font-semibold">
                    Payment Done
                  </span>
                </div>

                {/* ✅ FIXED DATE & TIME */}
                <p className="text-xs mt-1">
                  Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>
                <p className="text-xs text-gray-600">
                  Time: {new Date(order.createdAt).toLocaleTimeString("en-IN")}
                </p>
              </div>

              {/* AMOUNT */}
              <p className="font-semibold text-sm whitespace-nowrap">
                {currency}
                {order.amount}
              </p>

              {/* STATUS */}
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className="p-2 font-semibold border rounded whitespace-nowrap"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
