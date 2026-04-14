import React, { useState } from "react";
import {
  FaTshirt,
  FaSearch,
  FaComments,
  FaShoppingCart,
  FaPrint,
  FaStar,
  FaFilter,
  FaChevronDown,
} from "react-icons/fa";
import "./Shoping.css";
import { useProducts } from "../../../../context/product_context/useProducts";
import { getRandomProducts } from "./Shoping";

const products = [
  { id: 1, name: "Product 1", price: "₹499" },
  { id: 2, name: "Product 2", price: "₹799" },
  { id: 3, name: "Product 3", price: "₹999" },
  { id: 4, name: "Product 4", price: "₹599" },
  { id: 5, name: "Product 5", price: "₹1299" },
];

const Shopping = () => {
  const { cache } = useProducts();
  const allProducts = Object.values(cache).flat();
  const newArrival = getRandomProducts(allProducts);
  console.log(newArrival);

  return (
    <div className="section-card clothing-section">
      {/* Header */}
      <div className="section-header">
        <div className="bg-dark text-white py-2 marquee-container">
          <div className="marquee-text fw-bold">
            🚀 New Launch | Special Discount | Shop Now 🚀
          </div>

          <style>
            {`
      .marquee-container {
        width: 100%;
        overflow: hidden;
        background: linear-gradient(to right, #3a06a3  , #0f91e2 , #8d07b9 );
        liner
        color: #fff;
        padding: 10px 0;
      }

      .marquee-text {
        display: inline-block;
        white-space: nowrap;
        animation: scrollText 12s linear infinite;
      }

      @keyframes scrollText {
        0% {
          transform: translateX(45vw);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `}
          </style>
        </div>
      </div>

      <div className="row g-0">
        <h5>New Arrivals</h5>
        <div className="scroll-wrapper">
          <div className="scroll-track">
            {[...newArrival, ...newArrival].map((item, index) => (
              <div key={index} className="card product-card shadow-sm">
                <div className="card-body text-center">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src = "https://picsum.photos/640/640";
                    }}
                  />
                  <h6>{item.id}</h6>
                  <h6>{item.title}</h6>
                  <p className="mb-0">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <style>
            {`
          .scroll-wrapper {
            overflow: hidden;
            width: 100%;
            background: #f8f9fa;
            padding: 10px 0;
          }

          .scroll-track {
            display: flex;
            width: max-content;
            animation: scrollLeft 30s linear infinite;
          }

          .product-card {
            width: 180px;
            margin: 0 10px;
            flex-shrink: 0;
            border-radius: 10px;
          }

          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
          </style>
        </div>

        <div className="col-12"></div>
      </div>
      <div className="row g-0">
        <h5>Electronics </h5>
        <div className="scroll-wrapper">
          <div className="scroll-track">
            {[...products, ...products].map((item, index) => (
              <div key={index} className="card product-card shadow-sm">
                <div className="card-body text-center">
                  <h6>{item.name}</h6>
                  <p className="mb-0">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <style>
            {`
          .scroll-wrapper {
            overflow: hidden;
            width: 100%;
            background: #f8f9fa;
            padding: 10px 0;
          }

          .scroll-track {
            display: flex;
            width: max-content;
            animation: scrollLeft 15s linear infinite;
          }

          .product-card {
            width: 180px;
            margin: 0 10px;
            flex-shrink: 0;
            border-radius: 10px;
          }

          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
          </style>
        </div>

        <div className="col-12"></div>
      </div>
      <div className="row g-0">
        <h5>Discount Zone</h5>
        <div className="scroll-wrapper">
          <div className="scroll-track">
            {[...products, ...products].map((item, index) => (
              <div key={index} className="card product-card shadow-sm">
                <div className="card-body text-center">
                  <h6>{item.name}</h6>
                  <p className="mb-0">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <style>
            {`
          .scroll-wrapper {
            overflow: hidden;
            width: 100%;
            background: #f8f9fa;
            padding: 10px 0;
          }

          .scroll-track {
            display: flex;
            width: max-content;
            animation: scrollLeft 15s linear infinite;
          }

          .product-card {
            width: 180px;
            margin: 0 10px;
            flex-shrink: 0;
            border-radius: 10px;
          }

          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
          </style>
        </div>

        <div className="col-12"></div>
      </div>
    </div>
  );
};

export default Shopping;
