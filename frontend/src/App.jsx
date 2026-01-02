import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Policy Pages
import PaymentPolicy from "./pages/PaymentPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Disclaimer from "./pages/Disclaimer";
import Error from "./components/Error";
import CancellationAndRefundPolicy from "./pages/CancellationAndRefundPolicy";
import ShippingAndDeliveryPolicy from "./pages/ShippingAndDeliveryPolicy";
import OrderSuccess from "./pages/OrderSuccess";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/single/:orderId" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />

        {/* ✅ Policy Pages (Razorpay-ready) */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route
          path="/cancellation-and-return-policy"
          element={<CancellationAndRefundPolicy />}
        />
        <Route
          path="/shipping-and-delivery"
          element={<ShippingAndDeliveryPolicy />}
        />
        <Route path="/payment-policy" element={<PaymentPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        <Route path="/*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
