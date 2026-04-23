
import React, { useState, useEffect } from "react";
import Hero from "../components/ui/Hero";

import investImg from "../assets/images/invest.jpg";
import ecommerceImg from "../assets/images/shoe.jpg";
import foodImg from "../assets/images/food.jpg";
import groceryImg from "../assets/images/grocery.jpg";

import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/ui/FeatureCard";
import { useProducts } from "../context/product_context/useProducts";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFood } from "../context/foodContext/useFood";

const HomePage = () => {
  const navigate = useNavigate();
  const { productDispatch, cache } = useProducts()
  const { foodCache } = useFood();

  console.log(foodCache)

  const shuffleProd = (arr) => [...arr].sort(() => 0.5 - Math.random());


  const getProductSlides = (() => {
    let cachedSlides = null;

    return (products) => {
      if (cachedSlides) return cachedSlides;

      const grouped = products.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});

      cachedSlides = Object.entries(grouped).map(([category, items]) => {
        return {
          category,
          products: shuffleProd(items).slice(0, 6),
        };
      });

      return cachedSlides;
    };
  })();

  const productSlides = getProductSlides(cache);

  const shuffleFood = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };


  const getFoodSlides = (() => {
    let cachedSlides = null;

    return (foods) => {
      if (cachedSlides) return cachedSlides;

      // ✅ filter only required categories
      const filtered = foods.filter(
        (item) => item.category === "veg" || item.category === "nonveg"
      );

      // ✅ group only veg & non-veg
      const grouped = filtered.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});

      // ✅ ensure both categories exist (even if empty)
      const categories = ["veg", "nonveg"];

      cachedSlides = categories.map((cat) => ({
        category: cat,
        foods: shuffleFood(grouped[cat] || []).slice(0, 6),
      }));

      return cachedSlides;
    };
  })();

  const foodSlides = getFoodSlides(foodCache);


  // ✅ get random recipe (only once)
  const getRandomRecipe = (() => {
    let cached = null;

    return (foods) => {
      if (cached) return cached;

      const withVideo = foods.filter(
        (item) => item.recipe?.videoUrl
      );

      const random =
        withVideo[Math.floor(Math.random() * withVideo.length)];

      cached = random;
      return cached;
    };
  })();

  const randomRecipe = getRandomRecipe(foodCache);

  // ✅ convert youtube link → embed link
  const getEmbedUrl = (url) => {
    if (!url) return "";

    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const [liveData, setLiveData] = useState([])
  const [gain, setGain] = useState(8.4)

  useEffect(() => {
    const initial = Array.from({ length: 20 }, (_, i) => ({ name: i, value: 200 + Math.random() * 50 + i * 5 }))
    setLiveData(initial)

    const interval = setInterval(() => {
      setLiveData(prev => {
        const next = [...prev.slice(1), { name: prev.length, value: 300 + Math.random() * 80 }]
        return next
      })
      setGain(8 + Math.random() * 1.5)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const pieData = [{ name: 'Stocks', value: 45 }, { name: 'Mutual', value: 30 }, { name: 'Gold', value: 25 }]
  const COLORS = ['#5a6238', '#8a9a5b', '#c0c9a0']

  return (
    <>
      <Hero />

      {/* Top Headline - Image jaisa */}
      <section className="py-4" style={{ background: '#f8f6f0' }}>
        <div className="container text-center">
          <h1 className="fw-bold mb-3" style={{ color: '#3e432e', letterSpacing: '1px' }}>Invest • Shop • Eat • Learn</h1>
          <div className="d-flex gap-3 justify-content-center">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/invest") }}
              className="btn px-4" style={{ backgroundColor: '#5a6238', color: 'white' }}>Invest Now</button>
            <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/orderFood") }}
              className="btn btn-outline-dark px-4">Order Food</button>
          </div>
        </div>
      </section>

      {/* Top 3 Cards - PEHLE SHOP & FOOD */}
      <section className="py-5" style={{ background: '#f8f6f0' }}>
        <div className="container">
          <div className="row g-4">

            {/* 1. SHOP - PEHLA */}
            <div className="col-lg-4">
              <FeatureCard title="Fashion & Clothing" image={ecommerceImg}>
                <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                  <p className="text-white-50 mb-1 small">Latest Trends</p>
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); productDispatch({ type: "SET_CATEGORY", payload: "all" }); navigate("/shopping") }}
                    className="btn w-100" style={{ backgroundColor: '#5a6238', color: 'white' }}>Shop Now</button>
                </div>
              </FeatureCard>
            </div>

            {/* 2. FOOD - DUSRA */}
            <div className="col-lg-4">
              <FeatureCard title="Food & Dining" image={foodImg}>
                <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                  <p className="text-white-50 mb-1 small">20 Min Delivery</p>
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/orderFood") }}
                    className="btn w-100" style={{ backgroundColor: '#5a6238', color: 'white' }}>Order Now</button>
                </div>
              </FeatureCard>
            </div>

            {/* 3. INVEST - LAST ME */}
            <div className="col-lg-4">
              <FeatureCard title="Invest with Us" image={investImg}>
                <div className="position-absolute top-0 start-0 w-100 h-100 p-3 d-flex flex-column justify-content-between" style={{ background: 'rgba(90,98,56,0.85)' }}>
                  <div>
                    <h5 className="text-white">Grow Your Wealth</h5>
                    <h3 className="text-warning">+12.5%</h3>
                  </div>
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/invest") }}
                    className="btn btn-light">Start Investing</button>
                </div>
              </FeatureCard>
            </div>

          </div>
        </div>
      </section>

      {/* 2x2 Dashboard Grid */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">

            {/* Clothing */}
            <div className="col-lg-6"
              onClick={()=> {
                  navigate("/shopping")
                  productDispatch({type: "SET_CATEGORY", payload: "all"})
                }}>
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3"
                >🛍️ Products</h5>
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">

                    {productSlides.map((slide, index) => (
                      <div
                        key={slide.category}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <h5 className="mb-3 text-capitalize">{slide.category}</h5>

                        <div className="row g-2">
                          {slide.products.map((item, i) => (
                            <div key={i} className="col-6 col-md-4 col-lg-2">

                              <div className="card border-0 text-center h-100">

                                {/* ✅ FIXED IMAGE BOX */}
                                <div
                                  style={{
                                    height: "120px",
                                    overflow: "hidden",
                                    borderRadius: "8px",
                                    background: "#f1f1f1"
                                  }}
                                >
                                  <img
                                    src={item.image}
                                    alt=""
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover"
                                    }}
                                  />
                                </div>

                                {/* ✅ FIXED PRICE POSITION */}
                                <div className="mt-2">
                                  <p className="mb-0 fw-semibold text-dark">
                                    ₹{item.price}
                                  </p>
                                </div>

                              </div>

                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* Controls */}
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>

                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">🍴 Food </h5>

                <div id="foodCarousel" className="carousel slide">
                  <div className="carousel-inner">

                    {foodSlides.map((slide, index) => (
                      <div
                        key={slide.category}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <h5 className="mb-3 text-capitalize">{slide.category}</h5>

                        {/* ✅ CENTERED ROW */}
                        <div className="row g-2 justify-content-center">
                          {slide.foods.map((item, i) => (
                            <div key={i} className="col-6 col-md-4 col-lg-2">

                              <div className="card border-0 text-center h-100">

                                {/* Image */}
                                <div
                                  style={{
                                    height: "120px",
                                    overflow: "hidden",
                                    borderRadius: "8px",
                                    background: "#f1f1f1"
                                  }}
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover"
                                    }}
                                  />
                                </div>

                                {/* Name + Price */}
                                <div className="mt-2">
                                  <p className="mb-0 small fw-semibold text-dark text-truncate">
                                    {item.name}
                                  </p>
                                  <p className="mb-0 fw-bold">
                                    ₹{item.price}
                                  </p>
                                </div>

                              </div>

                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* Controls */}
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#foodCarousel"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>

                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#foodCarousel"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                </div>
              </div>
            </div>


            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">🧾 Recipe</h5>

                {randomRecipe ? (
                  <div>

                    {/* Video */}
                    <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                      <iframe
                        width="100%"
                        height="200"
                        src={getEmbedUrl(randomRecipe.recipe.videoUrl)}
                        title={randomRecipe.name}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>

                    {/* Name + price */}
                    <div className="mt-2">
                      <p className="mb-0 fw-semibold">{randomRecipe.name}</p>
                      <small className="text-muted">₹{randomRecipe.price}</small>
                    </div>

                  </div>
                ) : (
                  <p className="text-muted">No recipe available</p>
                )}
              </div>
            </div>

            {/* INVESTMENT DASHBOARD - SABSE LAST ME */}
            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">💼 Investment Dashboard</h5>
                <div className="d-flex justify-content-between mb-2">
                  <div><small>Total Value:</small><h6 className="mb-0">$25,400</h6></div>
                  <div><small>Total Gain:</small><h6 className="mb-0 text-success">+{gain.toFixed(1)}%</h6></div>
                </div>

                <div style={{ height: '120px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={liveData}>
                      <defs><linearGradient id="inv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#5a6238" stopOpacity={0.8} /><stop offset="95%" stopColor="#5a6238" stopOpacity={0} /></linearGradient></defs>
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#5a6238" fill="url(#inv)" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/invest") }} className="btn btn-sm flex-fill" style={{ backgroundColor: '#5a6238', color: 'white' }}>Invest More</button>
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/invest") }} className="btn btn-sm btn-outline-dark flex-fill">Withdraw</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
};

export default HomePage;