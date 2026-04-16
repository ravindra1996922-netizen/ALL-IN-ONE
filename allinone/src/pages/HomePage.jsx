import React from "react";
import Hero from "../components/ui/Hero";
import FeatureCard from "../components/ui/FeatureCard";

import investImg from "../assets/images/invest.jpg";
import ecommerceImg from "../assets/images/shoe.jpg";
import foodImg from "../assets/images/food.jpg";
import groceryImg from "../assets/images/grocery.jpg";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />

      {/* 4 Cards Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">

            {/* INVESTMENT CARD */}
            <div className="col-md-6 col-lg-3">
              <FeatureCard title="Investment" image={investImg}>
                <button
                  onClick={() => navigate("/invest")}
                  className="btn text-white position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4"
                  style={{ backgroundColor: "#008060" }}
                >
                  Invest Now
                </button>
              </FeatureCard>
            </div>

            {/* E-COMMERCE CARD */}
            <div className="col-md-6 col-lg-3">
              <FeatureCard title="E-Commerce" image={ecommerceImg}>
                <button
                  onClick={() => navigate("/shopping")}
                  className="btn text-white position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4"
                  style={{ backgroundColor: "#008060" }}
                >
                  Order Now
                </button>
              </FeatureCard>
            </div>

            {/* FOOD CARD */}
            <div className="col-md-6 col-lg-3">
              <FeatureCard title="Food & Dining" image={foodImg}>
                <button
                  onClick={() => navigate("/orderFood")}
                  className="btn text-white position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4"
                  style={{ backgroundColor: "#008060" }}
                >
                  Order Now
                </button>
              </FeatureCard>
            </div>

            {/* GROCERY CARD */}
            <div className="col-md-6 col-lg-3">
              <FeatureCard title="Groceries" image={groceryImg}>
                <button
                  onClick={() => navigate("/grocery")}
                  className="btn text-white position-absolute bottom-0 start-50 translate-middle-x mb-3 px-4"
                  style={{ backgroundColor: "#008060" }}
                >
                  Shop Now
                </button>

                <div className="position-absolute top-0 end-0 m-2 bg-success text-white px-2 py-1 rounded">
                  Same-Day Delivery
                </div>
              </FeatureCard>
            </div>

          </div>
        </div>
      </section>

      
    </>
  );
};

export default HomePage;