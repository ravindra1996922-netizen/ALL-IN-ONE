// import { useAuth } from "./context/authContext/useAuth";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import HomePage from "./pages/HomePage";

// import InvestOnUS from "./features/invest_on_us_feature/components/InvestOnUS";

// import FoodLanding from "./features/order_food_feature/food_context/FoodLanding";

// import ShopingLanding from "./features/shoping_feature/manage_Shoping_data/components/ShopingLanding";

// function AppContent() {
//   const { user, page } = useAuth();

//   if (user) return <HomePage />;

//   switch (page) {
//     case "login":
//       return <LoginPage />;
//     case "register":
//       return <SignupPage />;
//     default:
//       return <HomePage />;
//   }
// }

// export default function App() {
//   return (
//     <>

//       {/* <InvestOnUS></InvestOnUS> */}

//       {/* <ShopingLanding></ShopingLanding> */}
//       {/* <FoodLanding /> */}
//       {/* <hr />
//       <hr /> */}
//       <AppContent></AppContent>

//     </>
//   );
// }

// src/App.jsx
import React from "react";

import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/section/Hero/Hero";
import InvestmentDashboard from "./components/section/Investment/Investment";
import Shopping from "./components/section/Shopping/Shopping";
import FoodSection from "./components/section/Food/Food";
import GrocerySection from "./components/section/Grocery/Grocery";
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="main-content">
        <div className="container-fluid px-4">
          {/* Row 1: Investment + Clothing */}
          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <InvestmentDashboard />
            </div>
            <div className="col-lg-6">
              <Shopping />
            </div>
          </div>

          {/* Row 2: Food + Grocery */}
          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <FoodSection />
            </div>
            <div className="col-lg-6">
              <GrocerySection />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
