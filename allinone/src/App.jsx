import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";

import Footer from "./components/layout/Footer/Footer";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage></HomePage>
      <Footer />
    </div>
  );
}

export default App;
