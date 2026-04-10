import { useAuth } from "./context/authContext/useAuth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD
import InvestOnUS from "./features/invest_on_us_feature/components/InvestOnUS";
=======
import FoodLanding from "./features/order_food_feature/food_context/FoodLanding";
>>>>>>> e8e0dd326ceffa059018950459357a69e96973f1

function AppContent() {
  const { user, page } = useAuth();

  if (user) return <HomePage />;

  switch (page) {
    case "login":
      return <LoginPage />;
    case "register":
      return <SignupPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <>
<<<<<<< HEAD
    <InvestOnUS></InvestOnUS>
      {/* <AppContent></AppContent> */}
=======
      <AppContent></AppContent>
      <FoodLanding/>
>>>>>>> e8e0dd326ceffa059018950459357a69e96973f1
    </>
  );
}
