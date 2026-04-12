import React from "react";
import {
  FaUtensils,
  FaBookOpen,
  FaBell,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import "./Food.css";

const dishes = [
  { id: 1, name: "Pepperoni Pizza", price: "$4.49" },
  { id: 2, name: "Cheese Burger", price: "$6.99" },
  { id: 3, name: "Paneer Curry", price: "$6.49" },
];

const FoodSection = () => {
  return (
    <div className="section-card food-section">
      {/* Header */}
      <div className="section-header">
        <div className="d-flex align-items-center gap-2">
          <FaUtensils className="section-icon" />
          <h5 className="section-title">Food & Recipes</h5>
        </div>
        <div className="d-flex align-items-center gap-2">
          <FaBookOpen className="header-icon" />
          <FaBell className="header-icon" />
          <FaHeart className="header-icon" />
          <FaShoppingCart className="header-icon" />
        </div>
      </div>

      {/* Popular Dishes */}
      <h6 className="subsection-title">Popular Dishes</h6>
      <div className="row g-2 mb-3">
        {dishes.map((dish) => (
          <div key={dish.id} className="col-4">
            <div className="food-card">
              <div className="food-img">
                <div className="food-placeholder">🍕</div>
                <div className="food-badge">GAT</div>
              </div>
              <div className="food-info">
                <p className="food-name">{dish.name}</p>
                <p className="food-price">{dish.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipes Section */}
      <h6 className="subsection-title">Delicious Recipes</h6>
      <div className="recipe-subscribe">
        <div className="recipe-overlay">
          <h5>Subscribe to Unlock Recipes</h5>
          <p>Get Access to Exclusive Recipes</p>
          <button className="btn btn-primary-custom px-4 py-2">
            Subscribe Now
            <br />
            <small style={{ fontSize: "10px", opacity: 0.8 }}>999 month</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodSection;
