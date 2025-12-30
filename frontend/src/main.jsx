import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import ShopContextProvider from "./context/ShopContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ShopContextProvider>
          <App />
          <SpeedInsights />
        </ShopContextProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
