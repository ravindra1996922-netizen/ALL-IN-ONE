import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext/AuthContext.jsx";
import { ProductsProvider } from "./context/product_context/ProductsContext.jsx";
import FoodProvider from "./context/foodContext/FoodCentext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ProductsProvider>
      <FoodProvider>
        <App />
      </FoodProvider>
    </ProductsProvider>
  </AuthProvider>,
);
