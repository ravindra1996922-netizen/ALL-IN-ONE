import React, { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext/useAuth";
import { toast } from "react-toastify";

const InvestOnUS = () => {
  const { stockQuantity, stockPrice, user, authDispatch } = useAuth();
  const navigate = useNavigate();

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
    { month: "Apr", value: 2172 },
  ];

  const maxValue = chartData[chartData.length - 1].value;
  const [sharePrice, setSharePrice] = useState([maxValue]);
  const [userData, setUserData] = useState([]);

  const businessCategories = [
    { name: "E-Commerce", icon: "🛒" },
    { name: "Food Delivery", icon: "🍕" },
    { name: "Logistics", icon: "🚚" },
    { name: "Digital Payments", icon: "💳" },
    { name: "Cloud Kitchen", icon: "👨‍🍳" },
    { name: "Grocery", icon: "🥬" },
    { name: "Fashion", icon: "👕" },
    { name: "Electronics", icon: "📱" },
    { name: "Health Tech", icon: "⚕️" },
    { name: "EdTech", icon: "📚" },
    { name: "Travel", icon: "✈️" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Real Estate", icon: "🏢" },
    { name: "FinTech", icon: "📈" },
    { name: "Insurance", icon: "🛡️" },
    { name: "EV Solutions", icon: "⚡" },
    { name: "Renewable Energy", icon: "🌱" },
    { name: "AI Services", icon: "🤖" },
    { name: "Cybersecurity", icon: "🔒" },
    { name: "Logistics Tech", icon: "📦" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randNum = Math.round(Math.random() * 2000);
      setSharePrice((p) => [...p, maxValue + randNum].slice(-2));
      setUserData((p) => [...p, { value: maxValue + randNum }]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentSharePriceStatus =
    sharePrice.length > 1 && sharePrice[1] - sharePrice[0] > 0;
  const currentPrice = sharePrice[sharePrice.length - 1];
  const totalQty = stockQuantity.reduce((item, acc) => item + acc, 0);
  const totalInvested = stockPrice
    .map((price, index) => price * stockQuantity[index])
    .reduce((item, acc) => item + acc, 0);
  const avgPrice = totalInvested / totalQty;
  const quantity = useRef(null);

  const handleBuy = () => {
    if (!user) {
      toast.warning("Please login first");
      navigate("/login");
      return;
    }
    const qty = Number(quantity.current.value);
    if (!qty || qty < 1) {
      toast.error("Enter valid quantity");
      return;
    }
    authDispatch({
      type: "STOCK_BUY",
      payload: { sq: quantity.current.value, sp: currentPrice },
    });
    toast.success("Stock purchased successfully");
  };

  const handleSell = () => {
    if (!user) {
      toast.warning("Please login first");
      navigate("/login");
      return;
    }

    const qty = Number(quantity.current.value);

    if (!qty || qty < 1) {
      toast.error("Enter valid quantity");
      return;
    }

    toast.info("Stock sold successfully 💰");
  };

  const isProfit = userData[userData.length - 1]?.value >= userData[0]?.value;
  const strokeColor = isProfit ? "#10B981" : "#EF4444";
  const profitLoss = totalQty > 0 ? (currentPrice - avgPrice) * totalQty : 0;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#1E293B",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #E2E8F0",
          padding: "20px 40px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "26px",
                color: "#0F172A",
                fontWeight: "700",
              }}
            >
              All In One Pvt Ltd
            </h1>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "14px",
                color: "#64748B",
              }}
            >
              Invest in the Future of Integrated Services
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: currentSharePriceStatus
                  ? "#DCFCE7"
                  : "#FEE2E2",
                padding: "8px 16px",
                borderRadius: "20px",
                color: currentSharePriceStatus ? "#166534" : "#991B1B",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {currentSharePriceStatus ? "▲" : "▼"} Live: ₹{currentPrice}
            </div>
            {!user && (
              <button
                onClick={() => navigate("/login")}
                style={{
                  marginLeft: "16px",
                  padding: "8px 20px",
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Login to Trade
              </button>
            )}
          </div>
        </div>
      </div>

      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                color: "#64748B",
              }}
            >
              5 Year Growth
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
                color: "#10B981",
              }}
            >
              +245%
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                color: "#64748B",
              }}
            >
              Market Cap
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              ₹2,450 Cr
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                color: "#64748B",
              }}
            >
              Dividend Yield
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              1.2%
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "14px",
                color: "#64748B",
              }}
            >
              Risk Level
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
                color: "#F59E0B",
              }}
            >
              Moderate
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#0F172A",
                }}
              >
                Share Price Performance
              </h2>
              <p
                style={{
                  margin: "4px 0 0 0",
                  fontSize: "14px",
                  color: "#64748B",
                }}
              >
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2E8F0"
                  vertical={false}
                />
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
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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

          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              height: "fit-content",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#0F172A",
              }}
            >
              Trade Shares
            </h3>

            <div
              style={{
                backgroundColor: "#F1F5F9",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "14px", color: "#64748B" }}>
                Current Price
              </span>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: currentSharePriceStatus ? "#10B981" : "#EF4444",
                  marginTop: "4px",
                }}
              >
                ₹{currentPrice}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: currentSharePriceStatus ? "#10B981" : "#EF4444",
                  marginTop: "2px",
                }}
              >
                {currentSharePriceStatus ? "+" : ""}
                {((sharePrice[1] || currentPrice) - sharePrice[0]).toFixed(2)}(
                {(((sharePrice[1] || currentPrice) - sharePrice[0]) /
                  sharePrice[0]) *
                  100 >
                0
                  ? "+"
                  : ""}
                {(
                  (((sharePrice[1] || currentPrice) - sharePrice[0]) /
                    sharePrice[0]) *
                  100
                ).toFixed(2)}
                %)
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "#374151",
                  marginBottom: "6px",
                  fontWeight: "500",
                }}
              >
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
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3B82F6")}
                onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "#F9FAFB",
                borderRadius: "6px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#6B7280" }}>Estimated Value</span>
              <span style={{ fontWeight: "600", color: "#0F172A" }}>
                ₹
                {(quantity.current?.value * currentPrice || 0).toLocaleString()}
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
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#059669")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#10B981")}
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
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  totalQty > 0 && (e.target.style.backgroundColor = "#DC2626")
                }
                onMouseOut={(e) =>
                  totalQty > 0 && (e.target.style.backgroundColor = "#EF4444")
                }
              >
                Sell
              </button>
            </div>
          </div>
        </div>

        {totalQty > 0 && (
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              marginBottom: "40px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                fontSize: "20px",
                fontWeight: "600",
                color: "#0F172A",
              }}
            >
              Your Portfolio
            </h3>

            <div style={{ height: "200px", marginBottom: "20px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userData}>
                  <defs>
                    <linearGradient
                      id="portfolioGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={strokeColor}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={strokeColor}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E2E8F0"
                    vertical={false}
                  />
                  <XAxis tick={false} axisLine={false} />
                  <YAxis
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E2E8F0",
                      borderRadius: "6px",
                    }}
                    formatter={(value) => [`₹${value}`, "Price"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={strokeColor}
                    fill="url(#portfolioGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "20px",
                paddingTop: "20px",
                borderTop: "1px solid #E2E8F0",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "13px",
                    color: "#64748B",
                  }}
                >
                  Total Shares
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#0F172A",
                  }}
                >
                  {totalQty}
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "13px",
                    color: "#64748B",
                  }}
                >
                  Average Price
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#0F172A",
                  }}
                >
                  ₹{avgPrice ? avgPrice.toFixed(2) : 0}
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "13px",
                    color: "#64748B",
                  }}
                >
                  Total Invested
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#0F172A",
                  }}
                >
                  ₹{totalInvested.toLocaleString()}
                </p>
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "13px",
                    color: "#64748B",
                  }}
                >
                  Profit/Loss
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: "700",
                    color: profitLoss >= 0 ? "#10B981" : "#EF4444",
                  }}
                >
                  {profitLoss >= 0 ? "+" : ""}₹{profitLoss.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "24px",
              fontWeight: "600",
              color: "#0F172A",
            }}
          >
            Investment Growth Overview
          </h2>
          <p
            style={{
              margin: "0 0 16px 0",
              lineHeight: "1.7",
              color: "#475569",
              fontSize: "16px",
            }}
          >
            At AllInOne Pvt Ltd, we continuously monitor and analyze investment
            trends to ensure sustainable financial growth. The chart above
            represents our company's share performance over time, highlighting
            fluctuations, growth patterns, and market responsiveness.
          </p>
          <p
            style={{
              margin: 0,
              lineHeight: "1.7",
              color: "#475569",
              fontSize: "16px",
            }}
          >
            Over the past 5 years, our investment strategy has delivered
            consistent upward momentum, with calculated risks and data-driven
            decisions contributing to long-term value creation. While short-term
            variations are expected, the overall trajectory demonstrates
            resilience and steady progress.
          </p>
        </div>

        <div style={{ marginBottom: "40px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: "28px",
                fontWeight: "700",
                color: "#0F172A",
              }}
            >
              20+ Upcomming Businesess
            </h2>
            <p style={{ margin: 0, fontSize: "16px", color: "#64748B" }}>
              One Investment. Diverse Portfolio. Unlimited Potential.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "16px",
            }}
          >
            {businessCategories.map((biz, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  textAlign: "center",
                  transition: "all 0.2s",
                  cursor: "default",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                  {biz.icon}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                  }}
                >
                  {biz.name}
                </p>
              </div>
            ))}
          </div>

          {/* <div
            style={{
              marginTop: "24px",
              padding: "20px",
              backgroundColor: "#EFF6FF",
              borderRadius: "10px",
              border: "1px solid #BFDBFE",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h4
                style={{
                  margin: "0 0 4px 0",
                  color: "#1E40AF",
                  fontSize: "18px",
                }}
              >
                Why Invest with All In One?
              </h4>
              <p style={{ margin: 0, color: "#3B82F6", fontSize: "14px" }}>
                Diversified ecosystem • 10M+ Users • 300% Growth •
                Recession-proof model
              </p>
            </div>
            <button
              style={{
                padding: "10px 24px",
                backgroundColor: "#2563EB",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              Download Prospectus
            </button>
          </div> */}
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "24px",
            color: "#64748B",
            fontSize: "13px",
            borderTop: "1px solid #E2E8F0",
          }}
        >
          <p style={{ marginBottom: "8px" }}>
            All In One Pvt Ltd. Investments are subject to market risks. Please
            read all scheme related documents carefully.
          </p>
          <p style={{ margin: 0 }}>
            © 2024 All In One Pvt Ltd. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default InvestOnUS;
