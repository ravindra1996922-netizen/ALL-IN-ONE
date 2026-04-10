import { useAuth } from "./context/authContext/useAuth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import InvestOnUS from "./features/invest_on_us_feature/components/InvestOnUS";

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
    <InvestOnUS></InvestOnUS>
      {/* <AppContent></AppContent> */}
    </>
  );
}
