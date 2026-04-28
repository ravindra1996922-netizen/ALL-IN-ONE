import React from "react";
import globeImg from "../../assets/images/globee.png";
import food2 from "../../assets/images/food2.jpg";
import shp from "../../assets/images/shop.jpg";

const Hero = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container position-relative overflow-visible">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">

            <div className="carousel-item active">
              <div className="row align-items-center hero-slide">
                <div className="col-lg-5">
                  <h1 className="display-5 fw-bold text-dark">
                    Your Entire Life,
                    <br />
                    Managed in One Place.
                  </h1>
                  <p className="text-secondary mt-3 fs-5">
                    All the tools you need to invest, shop, dine, and groceries—
                    unified in a single platform.
                  </p>
                </div>
                <div className="col-lg-7 text-center">
                  <img
                    src={globeImg}
                    alt="globe"
                    className="img-fluid rounded-4 shadow hero-img"
                  />
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="row align-items-center hero-slide">
                <div className="col-lg-5">
                  <h1 className="display-5 fw-bold text-dark">
                    Shop Smarter,
                    <br />
                    Live Better.
                  </h1>
                  <p className="text-secondary mt-3 fs-5">
                    Discover top products, compare prices, and make better
                    purchasing decisions effortlessly.
                  </p>
                </div>
                <div className="col-lg-7 text-center">
                  <img
                    src={shp}
                    alt="shopping"
                    className="img-fluid rounded-4 shadow hero-img"
                  />
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="row align-items-center hero-slide">
                <div className="col-lg-5">
                  <h1 className="display-5 fw-bold text-dark">
                    Eat Fresh,
                    <br />
                    Stay Healthy.
                  </h1>
                  <p className="text-secondary mt-3 fs-5">
                    Explore delicious meals, order groceries, and maintain a
                    healthier lifestyle with ease.
                  </p>
                </div>
                <div className="col-lg-7 text-center">
                  <img
                    src={food2}
                    alt="food"
                    className="img-fluid rounded-4 shadow hero-img"
                  />
                </div>
              </div>
            </div>

          </div>

          <button
            className="carousel-control-prev custom-arrow"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next custom-arrow"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee">
          <span>🔥 30% OFF on Branded Shoes <small>(T&C)</small></span>
          <span className="separator">|</span>

          <span>🛒 Trending Deals on Electronics</span>
          <span className="separator">|</span>

          <span>🍔 Free Delivery on first 2 Food Orders</span>
          <span className="separator">|</span>

          <span>📈 Stocks up by 12% today</span>
          <span className="separator">|</span>

          <span>💳 Cashback Offers Available</span>
          <span className="separator">|</span>

          <span>💰 Enter Coupon Code to get Discount</span>
          <span className="separator">|</span>

          <span>💸 Refer & Earn</span>
        </div>
      </div>

      <style>
        {`
          .hero-slide {
            min-height: 420px;
          }

          .hero-img {
            max-height: 320px;
            object-fit: cover;
          }

          /* arrows */
          .custom-arrow {
            width: 60px;
            height: 60px;
            background: rgba(0,0,0,0.6);
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
            opacity: 1;
          }

          .carousel-control-prev.custom-arrow {
            left: -70px;
          }

          .carousel-control-next.custom-arrow {
            right: -70px;
          }

          /* white arrows */
          .custom-arrow .carousel-control-prev-icon,
          .custom-arrow .carousel-control-next-icon {
            width: 35px;
            height: 35px;
            background-size: 100% 100%;
            filter: brightness(0) invert(1);
          }

          /* mobile */
          @media (max-width: 768px) {
            .carousel-control-prev.custom-arrow {
              left: 10px;
            }
            .carousel-control-next.custom-arrow {
              right: 10px;
            }
          }

          /* 🔥 marquee */
          .marquee-wrapper {
            overflow: hidden;
            background: #e2e8f0;
            color: #0f172a;
            padding: 16px 0;
            margin-top: 20px;
            border-top: 1px solid #cbd5e1;
            border-bottom: 1px solid #cbd5e1;
          }

          .marquee {
            display: flex;
            align-items: center;
            gap: 25px;
            white-space: nowrap;
            animation: scroll 25s linear infinite;
          }

          .marquee span {
            font-size: 16px;
            font-weight: 600;
          }

          .marquee small {
            font-size: 12px;
            color: #64748b;
          }

          .separator {
            color: #94a3b8;
            font-size: 18px;
          }

          .marquee-wrapper:hover .marquee {
            animation-play-state: paused;
          }

          @keyframes scroll {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;