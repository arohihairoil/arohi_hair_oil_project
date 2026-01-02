import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- RAZORPAY INIT (GUEST) ---------------- */
  const initPay = (order) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Arohi Hair Oil",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (data.success && data.orderId) {
            setCartItems({});
            navigate(`/single/${data.orderId}`);
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 🔴 IMPORTANT SAFETY CHECK
    if (!products || products.length === 0) {
      toast.error("Products are still loading. Please wait.");
      return;
    }

    let orderItems = [];

    for (const productId in cartItems) {
      const quantity = cartItems[productId];

      if (quantity > 0) {
        const product = products.find((p) => p._id === productId);

        if (!product) {
          console.warn("Product not found:", productId);
          continue;
        }

        orderItems.push({
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        });
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/razorpay`,
        orderData
      );

      if (response.data.success) {
        initPay(response.data.order);
      } else {
        toast.error(response.data.message || "Order failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Order placement failed");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
          />
        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            name="state"
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Pincode"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            className="border rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          className="border rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
        />
      </div>

      {/* RIGHT */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex items-center gap-3 border p-3 mt-4">
            <img className="h-6" src={assets.razorpay_logo} alt="Razorpay" />
            <p className="text-sm font-medium">Secure Razorpay Payment</p>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
