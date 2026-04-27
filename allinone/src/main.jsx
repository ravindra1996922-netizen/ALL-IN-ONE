import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import { AuthProvider } from "./context/authContext/AuthContext.jsx";
import { ProductsProvider } from "./context/product_context/ProductsContext.jsx";

import { BrowserRouter } from "react-router-dom";
import FoodProvider from "./context/foodContext/FoodContext.jsx";
import { CartProvider } from "./context/cartContext/CartContext.jsx";
import PortfolioProvider from "./context/portfolio_context/PortfolioContext.jsx";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext.jsx";
import { OrderProvider } from "./context/orderContext/OrderContext.jsx";
createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <FoodProvider>
              <PortfolioProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </PortfolioProvider>
            </FoodProvider>
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>,
);
