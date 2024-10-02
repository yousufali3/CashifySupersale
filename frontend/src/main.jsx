import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css"; // Import Slick CSS globally
import "slick-carousel/slick/slick-theme.css"; // Import Slick theme CSS globally
import { Provider } from "react-redux";
import { store } from "./store.js";
import { ToastContainer } from "react-toastify";

// Ensure ToastContainer is configured properly
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="bottom-center" // Set position to bottom-center for better mobile visibility
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        className="toast-container" // Add a custom class
      />
    </Provider>
  </StrictMode>
);
