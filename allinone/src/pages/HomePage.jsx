import Navbar from "../components/layout/Navbar";
import Food from "../components/section/Food";
import Footer from "../components/section/Footer";
import Grocery from "../components/section/Grocery";
import Hero from "../components/section/Hero";
import Investment from "../components/section/Investment";
import Shopping from "../components/section/Shopping";
import FeatureCard from "../components/ui/FeatureCard";

export default function HomePage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero FULL WIDTH */}
      <div className="container-fluid p-0">
        <Hero />
      </div>

      {/* Feature Cards */}
      <div className="container-fluid mt-4 p-0">
        <div className="row g-0">
          <div className="col-md-4">
            <FeatureCard
              title="Invest with Us"
              subtitle="Grow your wealth"
              btnText="Start Investing"
              img="https://images.unsplash.com/photo-1559526324-593bc073d938"
            />
          </div>

          <div className="col-md-4">
            <FeatureCard
              title="Fashion & Clothing"
              subtitle="Latest Trends"
              btnText="Shop Now"
              img="https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
            />
          </div>

          <div className="col-md-4">
            <FeatureCard
              title="Food & Recipes"
              subtitle="Delicious Meals"
              btnText="Order Now"
              img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            />
          </div>
        </div>
      </div>

      {/* Investment + Shopping */}
      <div className="container-fluid mt-4 p-0">
        <div className="row g-0">
          <div className="col-md-6">
            <Investment />
          </div>

          <div className="col-md-6">
            <Shopping />
          </div>
        </div>
      </div>

      {/* Food + Grocery */}
      <div className="container-fluid mt-4 p-0">
        <div className="row g-0">
          <div className="col-md-6">
            <Food />
          </div>

          <div className="col-md-6">
            <Grocery />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
