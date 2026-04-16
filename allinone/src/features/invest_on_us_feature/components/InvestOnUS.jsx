import React, { useEffect, useRef, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/authContext/useAuth';



const InvestOnUS = () => {

  const { stockQuantity, stockPrice, user, authDispatch } = useAuth();

  console.log("user : ", user);


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
    { month: "Apr", value: 2172 }
  ];

  const maxValue = chartData[chartData.length - 1].value;
  const [sharePrice, setSharePrice] = useState([maxValue]);
  const [userData, setUserData] = useState([]);



  useEffect(() => {
    const interval = setInterval(() => {
      const randNum = Math.round(Math.random() * 2000);
      setSharePrice(p => [...p, maxValue + randNum].slice(-2));
      setUserData(p => [...p, { "value": maxValue + randNum }])
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, []);



  const currentSharePriceStatus = sharePrice.length > 1 && sharePrice[1] - sharePrice[0] > 0;

  const currentPrice = sharePrice[sharePrice.length - 1]

  const totalQty = stockQuantity.reduce((item, acc) => item + acc, 0);
  const totalInvested = (stockPrice.map((price, index) => price * stockQuantity[index])).reduce((item, acc) => item + acc, 0);
  const avgPrice = totalInvested / totalQty;


  const quantity = useRef(null);

  // console.log("quantity", quantity.current.value ? quantity.current.value : 0)

  function handleBuy() {

    if (!user) {
      return;
    }

    const qty = Number(quantity.current.value);


    if (!qty || qty < 1) {
      alert("Enter valid quantity");
      return;
    }
    authDispatch({ type: "STOCK_BUY", payload: { sq: quantity.current.value, sp: currentPrice } })
  }

  function handleSell() {

    if (!user) {
      return;
    }


    authDispatch({ type: "STOCK_SELL", payload: { sq: quantity.current.value, sp: currentPrice } })
  }

  const isProfit = userData[userData.length - 1]?.value >= userData[0]?.value;
  const strokeColor = isProfit ? "#22c55e" : "#ef4444";


  return (
    <div style={{ width: "100%", fontFamily: "sans-serif", padding: "20px" }}>
      <header style={{
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
        paddingBottom: "10px"
      }}>
        <h1 style={{ margin: 0 }}>All In One Pvt Ltd</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Driving Smart Investments with Data Insights
        </p>
      </header>

      <main>
        <div >
          <div>
            <h3 style={{ marginBottom: "10px" }}>Investment Overview</h3>
            <ResponsiveContainer width={"100%"} height={400} >

              <AreaChart data={chartData} >
                <CartesianGrid stroke="#7b7c7e" strokeDasharray="1 2" />

                <Area dataKey={"value"} type={'linear'} stroke='#069606ca' activeDot={false} strokeWidth={2} fill='#04ad04fb' fillOpacity={0.2} />
                <XAxis dataKey={"month"} tick={{ fontSize: 12 }} label={{ value: "Months", position: "insideBottom", offset: -5 }} />
                <YAxis dataKey={"value"} tick={{ fontSize: 12 }} label={{ value: "Share Price", angle: -90, position: "insideLeft" }} />
                <Tooltip />
              </AreaChart>

            </ResponsiveContainer>
          </div>

          {(totalQty && 
            <div>

              <h1>All In One Pvt ltd</h1>
              <h2>Your Portfolio</h2>

              <div style={{ width: "100%", height: "200px" }}>
                <ResponsiveContainer>
                  <AreaChart data={userData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis tick={false} />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "none",
                        borderRadius: "8px",
                        color: "#fff"
                      }}
                      labelStyle={{ display: "none" }}
                      formatter={(value) => [`₹${value}`, "Price"]}
                    />
                    <Line dataKey="value" stroke='#25ff26' type={'linear'} isAnimationActive={false} dot={false} />

                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p>Total Quantity: {totalQty}</p>
              <p>Avg Buy Price: ₹{avgPrice ? avgPrice.toFixed(2) : 0}</p>
              <p>Total Invested:₹{totalInvested}</p>
              <p>Current Price: ₹{currentPrice}</p>

            </div>
          )}




        </div>



        <h2>Investment Growth Overview</h2>

        <p style={{ maxWidth: "80%", lineHeight: "1.6", color: "#374151" }}>
          At AllInOne Pvt Ltd, we continuously monitor and analyze investment trends
          to ensure sustainable financial growth. The chart above represents a
          simulated overview of our company’s share performance over time, highlighting
          fluctuations, growth patterns, and market responsiveness.
        </p>


        <div style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px"
        }}>
          <div>
            <h4>5 Year Growth</h4>
            <p style={{ color: "green" }}>+245%</p>
          </div>
          <div>
            <h4>Average Monthly Return</h4>
            <p>8.2%</p>
          </div>
          <div>
            <h4>Volatility Index</h4>
            <p>Moderate</p>
          </div>

          <div>
            <h4>Live Status</h4>
            <h3 style={{
              width: "120px",
              height: "60px",
              backgroundColor: currentSharePriceStatus ? "#16a34a" : "#dc2626",
              color: "#fff",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}>
              {currentSharePriceStatus ? "▲ " : "▼ "}
              {currentPrice}
            </h3>
          </div>

          <div style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px"
          }}>

            <button onClick={() => handleBuy()} style={{
              flex: 1,
              padding: "12px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              Buy Stock
            </button>

            <input ref={quantity} type='number' min="1" placeholder="Enter quantity" />

            <button onClick={() => handleSell()} style={{

              flex: 1,
              padding: "12px",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px"
            }}>
              Sell Stock
            </button>

          </div>
        </div>

        <p style={{ maxWidth: "80%", lineHeight: "1.6", color: "#374151" }}>
          Over the past 5 years, our investment strategy has delivered consistent
          upward momentum, with calculated risks and data-driven decisions contributing
          to long-term value creation. While short-term variations are expected,
          the overall trajectory demonstrates resilience and steady progress.
        </p>

        <p style={{ maxWidth: "80%", lineHeight: "1.6", color: "#374151" }}>
          This visualization is intended for demonstration purposes and reflects
          sample data designed to showcase analytical capabilities within our platform.
          Real-time insights and advanced forecasting tools are integrated into our
          system to empower better financial decision-making.
        </p>


      </main>

      


      <div style={{}}>



      </div>
    </div>
  )
}

export default InvestOnUS