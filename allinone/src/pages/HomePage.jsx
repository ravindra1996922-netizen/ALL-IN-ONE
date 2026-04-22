
import React, { useState, useEffect } from "react";
import Hero from "../components/ui/Hero";

import investImg from "../assets/images/invest.jpg";
import ecommerceImg from "../assets/images/shoe.jpg";
import foodImg from "../assets/images/food.jpg";
import groceryImg from "../assets/images/grocery.jpg";

import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/ui/FeatureCard";
import { useProducts } from "../context/product_context/useProducts";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const HomePage = () => {
  const navigate = useNavigate();
  const { productDispatch } = useProducts()

  const [liveData, setLiveData] = useState([])
  const [gain, setGain] = useState(8.4)

  useEffect(() => {
    // LIVE graph data
    const initial = Array.from({ length: 20 }, (_, i) => ({ name: i, value: 200 + Math.random() * 50 + i * 5 }))
    setLiveData(initial)

    const interval = setInterval(() => {
      setLiveData(prev => {
        const next = [...prev.slice(1), { name: prev.length, value: 300 + Math.random() * 80 }]
        return next
      })
      setGain(8 + Math.random() * 1.5)
    }, 3000)
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
            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">🛍️ Clothing</h5>
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    
                    <div className="carousel-item active">
                      <div className="row g-2">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                          <div className="col-4" key={i}>
                            <div className="card border-0" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); productDispatch({ type: "SET_CATEGORY", payload: "all" }); navigate("/shopping") }} style={{ cursor: 'pointer' }}>
                              <img src={ecommerceImg} className="card-img-top rounded" style={{ height: '90px', objectFit: 'cover' }} />
                              <div className="p-1"><small>${49 + i * 5}.99</small></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Food & Recipes */}
            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">🍕 Food & Recipes</h5>
                <p className="small text-muted">Popular Dishes</p>
                <div className="d-flex gap-2">
                  {['Pizza $4.49', 'Burger $6.99', 'Curry $6.49'].map((item, i) => (
                    <div key={i} className="card flex-fill border-0" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/orderFood") }} style={{ cursor: 'pointer' }}>
                      <img src={foodImg} style={{ height: '80px', objectFit: 'cover' }} className="rounded-top" />
                      <div className="p-2"><small>{item}</small></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grocery */}
            <div className="col-lg-6">
              <div className="border rounded-4 p-3 h-100" style={{ background: '#fdfcfa' }}>
                <h5 className="mb-3">🛒 Grocery Shopping</h5>
                <div className="row g-2">
                  {['Vegetables', 'Fruits', 'Dairy'].map((cat, i) => (
                    <div className="col-4" key={i}>
                      <img src={groceryImg} className="w-100 rounded" style={{ height: '70px', objectFit: 'cover' }} />
                      <small>{cat}</small>
                    </div>
                  ))}
                </div>
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
                      <Area type="monotone" dataKey="value" stroke="#5a6238" fill="url(#inv)" strokeWidth={2} dot={false} />
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