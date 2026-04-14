import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import sp from "../../../../assets/sp.png";
import fd from "../../../../assets/fd.png";
import inv from "../../../../assets/inv.png";

const Hero = () => {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      style={{ width: "100%", height: "300px" }}
    >
      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item active" style={{ height: "300px" }}>
          <img
            src={sp}
            alt="..."
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              
            }}
          />
        </div>

        {/* Slide 2 */}
        <div className="carousel-item" style={{ height: "300px" }}>
          <img
            src={fd}
            alt="..."
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              // objectPosition: "center -30%",
            }}
          />
        </div>

        {/* Slide 3 */}
        <div className="carousel-item" style={{ height: "300px" }}>
          <img
            src={inv}
            alt="..."
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              // objectPosition: "center -25%",
            }}
          />
        </div>
      </div>

      {/* ✅ Hidden but Working Prev Button */}
      <button
        className="carousel-control-prev custom-btn"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      {/* ✅ Hidden but Working Next Button */}
      <button
        className="carousel-control-next custom-btn"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        
      >
        <span className="carousel-control-next-icon"></span>
      </button>

      <style>
        {`
          .custom-btn {
            width: 5%;
            opacity: 0;              /* 🔥 invisible */
            pointer-events: auto;   /* 🔥 still clickable */
          }

          .carousel-control-prev {
            left: 0;
          }

          .carousel-control-next {
            right: 0;
          }

          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            background-size: 100% 100%;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
