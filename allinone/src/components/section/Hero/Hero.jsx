// src/components/Hero/Hero.jsx
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  return (
    <section
      className="hero-section"
      
    >
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="container text-center hero-content">
        <h1 className="hero-title">Invest • Shop • Eat • Learn</h1>

        <div className="hero-buttons">
          <button className="btn btn-primary-green">Shoping Now</button>

          <button className="btn btn-primary-green">Order Food</button>
          <button className="btn btn-primary-green">Invest Now</button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container hero-cards">
        <div className="row g-3">
          {/* Investment Card */}
          <div className="col-md-4">
            <div className="hero-card invest-card">
              <div className="card-content">
                <h3>Invest with Us</h3>
                <p>Grow Your Wealth</p>
                <div className="growth-badge">+12.5%</div>
              </div>
              <button className="btn btn-light hero-card-btn">
                Start Investing
              </button>
            </div>
          </div>

          {/* Fashion Card */}
          <div className="col-md-4">
            <div className="hero-card fashion-card">
              <div className="card-content-light">
                <h3>Fashion & Clothing</h3>
                <p>Latest Trends</p>
              </div>
              <button className="btn btn-primary-green hero-card-btn">
                Shop Now
              </button>
            </div>
          </div>

          {/* Accessories/Food Card */}
          <div className="col-md-4">
            <div className="hero-card food-card">
              <div className="card-content-light">
                <h3>Accessories</h3>
                <p>Premium Collection</p>
              </div>
              <button className="btn btn-primary-green hero-card-btn">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
