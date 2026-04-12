// src/components/Footer/Footer.jsx
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-list">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#investment">Investment</a>
              </li>
              <li>
                <a href="#clothes">Clothes</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Home</h6>
            <ul className="footer-list">
              <li>
                <a href="#investment">Investment</a>
              </li>
              <li>
                <a href="#clothes">Clothes</a>
              </li>
              <li>
                <a href="#shipping">Shipping & Returns</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Customer Service</h6>
            <ul className="footer-list">
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#shipping">Shipping & Returns</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="footer-heading">Follow Us</h6>
            <div className="social-icons">
              <a href="#fb" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#ig" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#tw" className="social-icon">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 ALL_IN_ONE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
