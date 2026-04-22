import React, { useState, useEffect } from "react";
import Hero from "../components/ui/Hero";

import investImg from "../assets/images/invest.jpg";
import ecommerceImg from "../assets/images/shoe.jpg";
import foodImg from "../assets/images/food.jpg";
import groceryImg from "../assets/images/grocery.jpg";

import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/ui/FeatureCard";
import { useProducts } from "../context/product_context/useProducts";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { useFood } from "../context/foodContext/useFood";

const HomePage = () => {
  const navigate = useNavigate();
  const { productDispatch, cache } = useProducts();
  const { foodCache } = useFood();

  // ✅ Random IDs based on actual length

  const randPID = Math.floor(Math.random() * 288) + 1
  const randFId = Math.floor(Math.random() * 90) + 1;



  const randProductImg = cache[randPID]?.image;
  const randFoodImg = foodCache[randFId]?.image;

  console.log(foodCache[randFId]?.recipe.videoUrl)


  const randRecipeVideo = foodCache[randFId]?.recipe.videoUrl;

  const [liveData, setLiveData] = useState([]);
  const [gain, setGain] = useState(8.4);

  useEffect(() => {
    const initial = Array.from({ length: 20 }, (_, i) => ({
      name: i,
      value: 200 + Math.random() * 50 + i * 5
    }));
    setLiveData(initial);

    const interval = setInterval(() => {
      setLiveData(prev => [
        ...prev.slice(1),
        { name: prev.length, value: 300 + Math.random() * 80 }
      ]);
      setGain(8 + Math.random() * 1.5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Hero />

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">

            {/* 🛍️ Clothing */}
            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">🛍️ Clothing</h5>
                <div className="col-4">
                  <div
                    className="card border-0"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      productDispatch({ type: "SET_CATEGORY", payload: "all" });
                      navigate("/shopping");
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={randProductImg}
                      className="card-img-top rounded"
                      style={{ height: '120px', objectFit: 'cover' }}
                    />
                    <div className="p-1">
                      <small>$49.99</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 🍕 Food */}
            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">🍕 Food</h5>

                <div
                  className="card border-0"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/orderFood");
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={randFoodImg}
                    style={{ height: '220px', objectFit: 'cover' }}
                    className="rounded-top"
                  />
                  <div className="p-2">
                    <small>Popular Dish</small>
                  </div>
                </div>
              </div>
            </div>

            {/* 🎥 Recipe Video */}
            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">🎥 Recipe Video</h5>

                <div
                  className="card border-0"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/orderFood");
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ height: '280px' }}>
                    <iframe
                      src={randRecipeVideo}
                      title="Recipe Video"
                      width="100%"
                      height="100%"
                      className="rounded"
                      style={{ border: "none" }}
                      allowFullScreen={false}
                    ></iframe>
                  </div>

                  <div className="p-2">
                    <small>Watch Recipe</small>
                  </div>
                </div>
              </div>
            </div>

            {/* 📈 Investment */}
            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">💼 Investment Dashboard</h5>

                <div className="d-flex justify-content-between mb-2">
                  <div>
                    <small>Total Value:</small>
                    <h6>$25,400</h6>
                  </div>
                  <div>
                    <small>Total Gain:</small>
                    <h6 className="text-success">+{gain.toFixed(1)}%</h6>
                  </div>
                </div>

                <div style={{ height: '120px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={liveData}>
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#5a6238"
                        fill="#5a6238"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button
                    onClick={() => navigate("/invest")}
                    className="btn btn-sm flex-fill"
                    style={{ backgroundColor: '#5a6238', color: 'white' }}
                  >
                    Invest More
                  </button>
                  <button
                    onClick={() => navigate("/invest")}
                    className="btn btn-sm btn-outline-dark flex-fill"
                  >
                    Withdraw
                  </button>
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