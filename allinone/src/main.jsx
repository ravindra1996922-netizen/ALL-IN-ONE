import { createRoot } from "react-dom/client";
import "./index.css";
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
