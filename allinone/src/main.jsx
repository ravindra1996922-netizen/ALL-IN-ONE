import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext/AuthContext.jsx";
import { ProductsProvider } from "./context/product_context/ProductsContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </AuthProvider>,
);
