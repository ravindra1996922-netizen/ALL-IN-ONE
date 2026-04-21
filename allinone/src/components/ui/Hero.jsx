import React from "react";
import globeImg from "../../assets/images/globee.png";
import food2 from "../../assets/images/food2.jpg";
import shp from "../../assets/images/shop.jpg";

const Hero = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <h1
                    className="display-5 fw-bold"
                    style={{ lineHeight: "1.2", color: "#1e293b" }}
                  >
                    Your Entire Life,
                    <br />
                    Managed in One Place.
                  </h1>
                  <p className="text-secondary mt-3 fs-5">
                    All the tools you need to invest, shop, dine, and
                    groceries—unified in a single platform.
                  </p>
                </div>
                <div className="col-lg-7 text-center">
                  <img
                    src={globeImg}
                    alt="globe"
                    className="img-fluid"
                    style={{ maxHeight: "380px" }}
                  />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={shp} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={food2} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="border-top border-bottom bg-white mt-4 py-3">
        <div className="container d-flex justify-content-center gap-5 flex-wrap text-dark">
          <div>
            <span className="me-2" style={{ color: "#94a3b8" }}>
              ■
            </span>{" "}
            1M+ Users
          </div>
          <div className="border-start ps-5">
            <span className="me-2" style={{ color: "#94a3b8" }}>
              ■
            </span>{" "}
            500+ Partners
          </div>
          <div className="border-start ps-5">🔒 Secure & Encrypted</div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
