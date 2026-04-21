
import React, { useEffect, useRef, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/authContext/useAuth';
import { toast } from 'react-toastify';
import { usePortfolio } from '../../../context/portfolio_context/usePortfolio';
import { buyAndSell } from '../../../utils/api/PortfolioApis/portfolioapis';

const InvestOnUS = () => {
  
  const {  user, authDispatch } = useAuth();
  const navigate = useNavigate();
  const userId=user?.user?.id;

const{ stockQuantity = [], stockPrice = [] ,portfolioDispatch}=usePortfolio()
// console.log(portfolioDispatch)
   

// let{ stockQuantity stockPrice=[] }=portfolio
  const chartData = [ 
    { month: "May", value: 560 },
    { month: "Jun", value: 196 },
    { month: "Jul", value: 695 },
    { month: "Aug", value: 671 },
    { month: "Sep", value: 1451 },
    { month: "Oct", value: 1412 },
    { month: "Nov", value: 1900 },
    { month: "Dec", value: 1723 },
    { month: "Jan", value: 1806 },
    { month: "Feb", value: 1482 },
    { month: "Mar", value: 1982 },
    { month: "Apr", value: 2172 }
  ];

  const futureVision = [
    {
      title: "Energy & Utilities",
      items: [
        "Integrated Solar Manufacturing & Power Generation",
        "Hybrid Renewable Energy Parks (Solar, Wind & Storage)",
        "Nuclear Energy Support Infrastructure (PPP Model)",
        "Oil Refining & Petrochemical Development"
      ]
    },
    {
      title: "Water & Environment",
      items: [
        "National Water Infrastructure Projects",
        "Seawater Desalination Plants",
        "Village Water Purification Systems"
      ]
    },
    {
      title: "Infrastructure & Logistics",
      items: [
        "National Logistics & Port Infrastructure",
        "Smart City Infrastructure Development",
        "International Infrastructure Projects"
      ]
    },
    {
      title: "Agriculture & Food Systems",
      items: [
        "Agri-Processing & Food Export Zones",
        "Farmer-to-Consumer Direct Market Network"
      ]
    },
    {
      title: "Trade & Natural Resources",
      items: [
        "Import–Export & Global Trade Hubs",
        "Natural Resource Management & Processing"
      ]
    },
    {
      title: "Social Infrastructure",
      items: [
        "Affordable Hospital Network & Medical Colleges",
        "Education Ecosystem (Schools & Skill Universities)",
        "Integrated Ashram Network (Children & Elderly Care)"
      ]
    },
    {
      title: "Employment & Human Capital",
      items: [
        "National Skill Development & Employment Program"
      ]
    },
    {
      title: "Strategic Support Systems",
      items: [
        "Disaster Response & Emergency Infrastructure",
        "Secure Housing & Rental Verification Systems"
      ]
    }
  ];

  const maxValue = chartData[chartData.length - 1].value;
  const [sharePrice, setSharePrice] = useState([maxValue]);
  const [userData, setUserData] = useState([]);


  useEffect(() => {
    const interval = setInterval(() => {
      const randNum = Math.round(Math.random() * 4000);
      setSharePrice(p => [...p, maxValue + randNum].slice(-2));
      setUserData(p => [...p, { "value": maxValue + randNum }])
    }, 4000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const currentSharePriceStatus = sharePrice.length > 1 && sharePrice[1] - sharePrice[0] > 0;
  const currentPrice = sharePrice[sharePrice.length - 1];
  const quantity = useRef(null);



const totalQty = stockQuantity.reduce((acc, item) => acc + item, 0);

const totalInvested = stockPrice.reduce(
  (acc, price, index) => acc + price * (stockQuantity[index] || 0),
  0
);

const avgPrice = totalQty > 0 ? totalInvested / totalQty : 0;

const handleBuy = () => {
  if (!user) {
    toast.error("login first");
    return;
  }

  const qty = Number(quantity.current.value);

  if (!qty || qty < 1) {
    toast.warning("invalid quantity");
    return;
  }

  portfolioDispatch({
    type: "BUY_STOCK",
    payload: {
      qty,
      price: currentPrice
    }
  });

  quantity.current.value = "";
};

const handleSell = () => {
  if (!user) {
    toast.error("Login first");
    navigate('/login');
    return;
  }

  const qty = Number(quantity.current.value);

  if (!qty || qty < 1) {
    toast.warning("Invalid quantity");
    return;
  }

  if (qty > totalQty) {
    toast.error("Not enough shares to sell");
    return;
  }

  portfolioDispatch({
    type: "SELL_STOCK",
    payload: { qty }
  });

  quantity.current.value = "";
};
  const isProfit = userData[userData.length - 1]?.value >= userData[0]?.value;
  const strokeColor = isProfit ? "#10B981" : "#EF4444";
  const profitLoss = totalQty > 0 ? (currentPrice - avgPrice) * totalQty : 0;

  useEffect(()=>{
    if(!user) return 
  (  async () => {
      const res= await buyAndSell(userId,totalQty,totalInvested)
      console.log(res)
      
    } )()

  },[totalQty,totalInvested])

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#F8FAFC",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#1E293B"
    }}>
      

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}>

        {/* Top Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "32px"
        }}>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#64748B" }}>5 Year Growth</p>
            <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#10B981" }}>+245%</p>
          </div>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#64748B" }}>Market Cap</p>
            <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#0F172A" }}>₹2,450 Cr</p>
          </div>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#64748B" }}>Dividend Yield</p>
            <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#0F172A" }}>1.2%</p>
          </div>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
            <p style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#64748B" }}>Risk Level</p>
            <p style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#F59E0B" }}>Moderate</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "40px"
        }}>

          {/* Chart Section */}
          <div style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#0F172A" }}>
                Share Price Performance
              </h2>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748B" }}>
                Last 12 months data • Updated live
              </p>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                  formatter={(value) => [`₹${value}`, "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Order Panel */} 
          <div style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            height: "fit-content"
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between", marginBottom: "15px"
            }}>
              <h3 style={{ margin: "20px 0 10px 0", fontSize: "18px", fontWeight: "600", color: "#0F172A" }}>
                Trade Shares
              </h3>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: currentSharePriceStatus ? "#DCFCE7" : "#FEE2E2",
                padding: "8px 16px",
                borderRadius: "20px",
                color: currentSharePriceStatus ? "#166534" : "#991B1B",
                fontWeight: "600",
                fontSize: "14px",
                letterSpacing:"5px"
              }}>
                {currentSharePriceStatus ? "▲" : "▼"} Live
              </div>
            </div>

            <div style={{
              backgroundColor: "#F1F5F9",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center"
            }}>
              <span style={{ fontSize: "14px", color: "#64748B" }}>Current Price</span>
              <div style={{
                fontSize: "32px",
                fontWeight: "700",
                color: currentSharePriceStatus ? "#10B981" : "#EF4444",
                marginTop: "4px"
              }}>
                ₹{currentPrice}
              </div>
              <div style={{
                fontSize: "13px",
                color: currentSharePriceStatus ? "#10B981" : "#EF4444",
                marginTop: "2px"
              }}>
                {currentSharePriceStatus ? "+" : ""}
                {((sharePrice[1] || currentPrice) - sharePrice[0]).toFixed(2)}
                ({((sharePrice[1] || currentPrice) - sharePrice[0]) / sharePrice[0] * 100 > 0 ? "+" : ""}
                {(((sharePrice[1] || currentPrice) - sharePrice[0]) / sharePrice[0] * 100).toFixed(2)}%)
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", color: "#374151", marginBottom: "6px", fontWeight: "500" }}>
                Quantity
              </label>
              <input
                ref={quantity}
                type="number"
                min="1"
                placeholder="Enter quantity"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "6px",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3B82F6"}
                onBlur={(e) => e.target.style.borderColor = "#D1D5DB"}
              />
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              backgroundColor: "#F9FAFB",
              borderRadius: "6px",
              marginBottom: "20px",
              fontSize: "14px"
            }}>
              <span style={{ color: "#6B7280" }}>Estimated Value</span>
              <span style={{ fontWeight: "600", color: "#0F172A" }}>
                ₹{(quantity.current?.value * currentPrice || 0).toLocaleString()}
              </span>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleBuy}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#10B981",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#059669"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#10B981"}
              >
                Buy
              </button>
              <button
                onClick={handleSell}
                disabled={totalQty <= 0}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: totalQty > 0 ? "#EF4444" : "#9CA3AF",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: totalQty > 0 ? "pointer" : "not-allowed",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => totalQty > 0 && (e.target.style.backgroundColor = "#DC2626")}
                onMouseOut={(e) => totalQty > 0 && (e.target.style.backgroundColor = "#EF4444")}
              >
                Sell
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        {totalQty > 0 && (
          <div style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            marginBottom: "40px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: "600", color: "#0F172A" }}>
              Your Portfolio
            </h3>

            <div style={{ height: "200px", marginBottom: "20px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userData}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis tick={false} axisLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", border: "1px solid #E2E8F0", borderRadius: "6px" }}
                    formatter={(value) => [`₹${value}`, "Price"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={strokeColor}
                    fill="url(#portfolioGradient)"
                    strokeWidth={2}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #E2E8F0"
            }}>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#64748B" }}>Total Shares</p>
                <p style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#0F172A" }}>{totalQty}</p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#64748B" }}>Average Price</p>
                <p style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#0F172A" }}>
                  ₹{avgPrice ? avgPrice.toFixed(2) : 0}
                </p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#64748B" }}>Total Invested</p>
                <p style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#0F172A" }}>
                  ₹{totalInvested.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#64748B" }}>Profit/Loss</p>
                <p style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "700",
                  color: profitLoss >= 0 ? "#10B981" : "#EF4444"
                }}>
                  {profitLoss >= 0 ? "+" : ""}₹{profitLoss.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <div style={{
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          marginBottom: "40px"
        }}>
          <h2 style={{ margin: "0 0 16px 0", fontSize: "24px", fontWeight: "600", color: "#0F172A" }}>
            Investment Growth Overview
          </h2>
          <p style={{ margin: "0 0 16px 0", lineHeight: "1.7", color: "#475569", fontSize: "16px" }}>
            At AllInOne Pvt Ltd, we continuously monitor and analyze investment trends to ensure sustainable financial growth.
            The chart above represents our company's share performance over time, highlighting fluctuations, growth patterns, and market responsiveness.
          </p>
          <p style={{ margin: 0, lineHeight: "1.7", color: "#475569", fontSize: "16px" }}>
            Over the past 5 years, our investment strategy has delivered consistent upward momentum, with calculated risks and
            data-driven decisions contributing to long-term value creation. While short-term variations are expected, the overall
            trajectory demonstrates resilience and steady progress.
          </p>
        </div>

        {/* Future Expansion Vision */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#0F172A" }}>
              Future Expansion Vision
            </h2>
            <p style={{ color: "#64748B", fontSize: "15px" }}>
              Building an integrated infrastructure and social development enterprise across energy,
              water, logistics, and human capital sectors.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {futureVision.map((section, idx) => (
              <div key={idx} style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                padding: "20px",
                transition: "0.2s"
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h4 style={{
                  marginBottom: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1E293B"
                }}>
                  {section.title}
                </h4>

                <ul style={{
                  paddingLeft: "18px",
                  margin: 0,
                  color: "#475569",
                  fontSize: "14px",
                  lineHeight: "1.6"
                }}>
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>



      </main>
    </div>
  )
}

export default InvestOnUS;