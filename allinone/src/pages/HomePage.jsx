import FoodSection from "../components/section/HomepageSection/Food/Food";
import GrocerySection from "../components/section/HomepageSection/Grocery/Grocery";
import Hero from "../components/section/HomepageSection/Hero/Hero";
import InvestmentDashboard from "../components/section/HomepageSection/Investment/Investment";
import Shopping from "../components/section/HomepageSection/Shopping/Shopping";

export default function HomePage() {
  return (
    <>
      <Hero />
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
    </>
  );
}
