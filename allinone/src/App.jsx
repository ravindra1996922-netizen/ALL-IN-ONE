import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Investment from "./pages/Investment";
import Shopping from "./pages/Shopping";
import OrderFood from "./pages/OrderFood";
import Grocery from "./pages/Grocery";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
    
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invest" element={<Investment />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/orderFood" element={<OrderFood />} />
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;