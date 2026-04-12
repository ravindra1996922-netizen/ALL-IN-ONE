import React, { useState } from "react";
import {
  FaGlobe,
  FaBell,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <nav className="navbar-custom">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Logo */}
          <div className="navbar-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">ALL IN ONE</span>
          </div>

          {/* Nav Links */}
          <div className="nav-links d-none d-lg-flex">
            <a href="#home" className="nav-link active">
              Home
            </a>
            <a href="#investment" className="nav-link">
              Investment
            </a>
            <a href="#clothes" className="nav-link">
              Clothes
            </a>
            <a href="#accessories" className="nav-link">
              Accessories
            </a>
            <a href="#food" className="nav-link">
              Food
            </a>
            <a href="#grocery" className="nav-link dropdown-link">
              Grocery <FaChevronDown size={10} />
            </a>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Right Icons */}
          <div className="nav-icons d-flex align-items-center gap-3">
            <FaGlobe className="nav-icon" />
            <FaBell className="nav-icon" />
            <FaHeart className="nav-icon" />
            <FaShoppingCart className="nav-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
