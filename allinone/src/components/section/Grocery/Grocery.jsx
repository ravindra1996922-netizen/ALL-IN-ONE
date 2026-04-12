import React from "react";
import {
  FaShoppingBasket,
  FaCamera,
  FaBell,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import "./Grocery.css";

const groceryItems = [
  { id: 1, name: "Fresh Vegetables", emoji: "🥦", price: null },
  { id: 2, name: "Fruits", emoji: "🍎", price: null },
  { id: 3, name: "Dairy Products", emoji: "🥛", price: null },
  { id: 4, name: "Tomatoes", emoji: "🍅", price: "$1.99" },
  { id: 5, name: "Green Beans", emoji: "🫘", price: "$2.49" },
  { id: 6, name: "Apples", emoji: "🍏", price: "$4.99" },
  { id: 7, name: "Celery", emoji: "🥬", price: "$1.49" },
  { id: 8, name: "Salad Mix", emoji: "🥗", price: "$3.99" },
  { id: 9, name: "Milk", emoji: "🥛", price: "$2.99" },
];

const GrocerySection = () => {
  return (
    <div className="section-card grocery-section">
      {/* Header */}
      <div className="section-header">
        <div className="d-flex align-items-center gap-2">
          <FaShoppingBasket className="section-icon" />
          <h5 className="section-title">Grocery Shopping</h5>
        </div>
        <div className="d-flex align-items-center gap-2">
          <FaCamera className="header-icon" />
          <FaBell className="header-icon" />
          <FaHeart className="header-icon" />
          <FaShoppingCart className="header-icon" />
        </div>
      </div>

      {/* Grocery Grid */}
      <div className="row g-2">
        {groceryItems.map((item) => (
          <div key={item.id} className="col-4">
            <div className="grocery-card">
              <div className="grocery-img">
                <span className="grocery-emoji">{item.emoji}</span>
              </div>
              <div className="grocery-info">
                <p className="grocery-name">{item.name}</p>
                {item.price && (
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="grocery-price">{item.price}</span>
                    <button className="add-btn">Add</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrocerySection;
