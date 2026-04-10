import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const InvestOnUS = () => {


  // const monthArr = []
  // const date = new Date();

  // const randNum = [];
  // let n = 499;

  // for (let i = 1; i <= 12; i++) {
  //   const now = new Date(date.getFullYear(), date.getMonth() + i, 1);
  //   // console.log(i);

  //   if (i % 2 === 0) {
  //     n -= Math.round(Math.random() * 400);
  //     randNum.push(n)
  //     // console.log(Math.round(n)+ "even "+ i);
  //   } else {
  //     n += Math.round(Math.random() * 1000)
  //     randNum.push(n)
  //     // console.log(Math.round(n)+ " odd "+i);
  //   }


  //   const monthString = now.toLocaleString("default", { month: "short" });
  //   const month = monthString[0].toUpperCase() + monthString.slice(1);
  //   // console.log(month);

  //   monthArr.push(month);
  // }

  const chartData = [
    {
      "month": "May",
      "value": 560
    },
    {
      "month": "Jun",
      "value": 196
    },
    {
      "month": "Jul",
      "value": 695
    },
    {
      "month": "Aug",
      "value": 671
    },
    {
      "month": "Sep",
      "value": 1451
    },
    {
      "month": "Oct",
      "value": 1412
    },
    {
      "month": "Nov",
      "value": 1900
    },
    {
      "month": "Dec",
      "value": 1723
    },
    {
      "month": "Jan",
      "value": 1806
    },
    {
      "month": "Feb",
      "value": 1482
    },
    {
      "month": "Mar",
      "value": 1982

    },
    {
      "month": "Apr",
      "value": 2172
    }
  ]

  // console.log(monthArr);
  // console.log(randNum)

  // const chartData = monthArr.map((ele, idx) => ({ "month": ele, "value": randNum[idx] }))
  // console.log()
  const maxValue = chartData[chartData.length - 1].value;
  const [sharePrice, setSharePrice] = useState([maxValue]);

  // console.log("sahre Price --- "+ sharePrice)

  useEffect(() => {
    const interval = setInterval(() => {
      setSharePrice(p => [...p, maxValue + Math.round(Math.random() * 100)].slice(-2))
      // console.log(maxValue+sideValue);
    }, 2000);

    return () => {
      clearInterval(interval);
    }
  }, [])
  // console.log("sharePrice ----" + sharePrice);

  const currentSharePriceDifference = sharePrice.length > 1 ? sharePrice[1] - sharePrice[0] : 0;
  // console.log("currentSharePriceDifference :   " + currentSharePriceDifference)

  const currentSharePriceStatus = currentSharePriceDifference > 0;
  // console.log("currentSharePriceStatus ----" + currentSharePriceStatus)
  // console.log("_________________________________________________");

  // const
  // console.log("object");


  return (
    <div style={{ width: "100%", fontFamily: "sans-serif", padding: "20px" }}>
      <header style={{
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
        paddingBottom: "10px"
      }}>
        <h1 style={{ margin: 0 }}>AllInOne Pvt Ltd</h1>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Driving Smart Investments with Data Insights
        </p>
      </header>

      <main>

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
              {sharePrice[sharePrice.length - 1]}
            </h3>
          </div>

          <div style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px"
          }}>

            <button style={{
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

            <button style={{
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




        <div>
          <h3 style={{ marginBottom: "10px", }}>Investment Overview</h3>
          <ResponsiveContainer width={"100%"} height={500}>

            <AreaChart data={chartData} >
              <CartesianGrid stroke="#7b7c7e" strokeDasharray="1 2" />
              <Area dataKey={"value"} type={'monotone'} stroke='#069606ca' activeDot={false} strokeWidth={2} fill='#04ad04fb' fillOpacity={0.2} />
              <XAxis dataKey={"month"} tick={{ fontSize: 12 }} label={{ value: "Months", position: "insideBottom", offset: -5 }} />
              <YAxis dataKey={"value"} tick={{ fontSize: 12 }} label={{ value: "Share Price", angle: -90, position: "insideLeft" }} />
              <Tooltip />
            </AreaChart>

          </ResponsiveContainer>
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

      <footer style={{
        marginTop: "40px",
        borderTop: "1px solid #ddd",
        paddingTop: "15px",
        textAlign: "center"
      }}>

        <p style={{ margin: "5px 0" }}>
          © 2026 AllInOne Pvt Ltd. All rights reserved.
        </p>

        {/* Fake Social Icons */}
        <div style={{ marginTop: "10px", fontSize: "20px" }}>
          🔵 📘  {/* Facebook */}
          🔷 🐦  {/* Twitter */}
          🔶 📸  {/* Instagram */}
          🔷 💼  {/* LinkedIn */}
        </div>

      </footer>


      <div style={{}}>



      </div>
    </div>
  )
}

export default InvestOnUS
