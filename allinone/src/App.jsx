import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import Investment from "./pages/Investment";
import Shopping from "./pages/Shopping";
import OrderFood from "./pages/OrderFood";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CategoryPage from "./pages/CategoryPage";
import CartsPage from "./pages/CartsPage";

function App() {
  return (
    <>
      <Navbar />

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invest" element={<Investment />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/orderFood" element={<OrderFood />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cart" element={<CartsPage />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
