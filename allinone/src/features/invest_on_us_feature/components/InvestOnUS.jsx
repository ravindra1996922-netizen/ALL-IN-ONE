// import React, { useEffect, useRef, useState } from 'react'
// import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
// import { useNavigate } from "react-router-dom";
// import { useAuth } from '../../../context/authContext/useAuth';



// const InvestOnUS = () => {

//   const { stockQuantity, stockPrice, user, authDispatch } = useAuth();

//   // console.log("user : ", user);


//   const navigate = useNavigate();

//   const chartData = [
//     { month: "May", value: 560 },
//     { month: "Jun", value: 196 },
//     { month: "Jul", value: 695 },
//     { month: "Aug", value: 671 },
//     { month: "Sep", value: 1451 },
//     { month: "Oct", value: 1412 },
//     { month: "Nov", value: 1900 },
//     { month: "Dec", value: 1723 },
//     { month: "Jan", value: 1806 },
//     { month: "Feb", value: 1482 },
//     { month: "Mar", value: 1982 },
//     { month: "Apr", value: 2172 }
//   ];

//   const maxValue = chartData[chartData.length - 1].value;
//   const [sharePrice, setSharePrice] = useState([maxValue]);
//   const [userData, setUserData] = useState([]);



//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randNum = Math.round(Math.random() * 2000);
//       setSharePrice(p => [...p, maxValue + randNum].slice(-2));
//       setUserData(p => [...p, { "value": maxValue + randNum }])
//     }, 2000);

//     return () => {
//       clearInterval(interval);
//     }
//   }, []);



//   const currentSharePriceStatus = sharePrice.length > 1 && sharePrice[1] - sharePrice[0] > 0;

//   const currentPrice = sharePrice[sharePrice.length - 1]

//   const totalQty = stockQuantity.reduce((item, acc) => item + acc, 0);
//   const totalInvested = (stockPrice.map((price, index) => price * stockQuantity[index])).reduce((item, acc) => item + acc, 0);
//   const avgPrice = totalInvested / totalQty;


//   const quantity = useRef(null);

//   // console.log("quantity", quantity.current.value ? quantity.current.value : 0)

//   function handleBuy() {

//     if (!user) {
//       return;
//     }

//     const qty = Number(quantity.current.value);


//     if (!qty || qty < 1) {
//       alert("Enter valid quantity");
//       return;
//     }
//     authDispatch({ type: "STOCK_BUY", payload: { sq: quantity.current.value, sp: currentPrice } })
//   }

//   function handleSell() {

//     if (!user) {
//       return;
//     }


//     authDispatch({ type: "STOCK_SELL", payload: { sq: quantity.current.value, sp: currentPrice } })
//   }

//   const isProfit = userData[userData.length - 1]?.value >= userData[0]?.value;
//   const strokeColor = isProfit ? "#22c55e" : "#ef4444";


//   return (
//     <div style={{ width: "100%", fontFamily: "sans-serif", padding: "20px" }}>
//       <header style={{
//         borderBottom: "1px solid #ddd",
//         marginBottom: "20px",
//         paddingBottom: "10px"
//       }}>
//         <h1 style={{ margin: 0 }}>All In One Pvt Ltd</h1>
//         <p style={{ color: "#6b7280", margin: 0 }}>
//           Driving Smart Investments with Data Insights
//         </p>
//       </header>



//       <main>
//         <div >
//           <div>
//             <h3 style={{ marginBottom: "10px" }}>Investment Overview</h3>
//             <ResponsiveContainer width={"100%"} height={400} >

//               <AreaChart data={chartData} >
//                 <CartesianGrid stroke="#7b7c7e" strokeDasharray="1 2" />

//                 <Area dataKey={"value"} type={'linear'} stroke='#069606ca' activeDot={false} strokeWidth={2} fill='#04ad04fb' fillOpacity={0.2} />
//                 <XAxis dataKey={"month"} tick={{ fontSize: 12 }} label={{ value: "Months", position: "insideBottom", offset: -5 }} />
//                 <YAxis dataKey={"value"} tick={{ fontSize: 12 }} label={{ value: "Share Price", angle: -90, position: "insideLeft" }} />
//                 <Tooltip />
//               </AreaChart>

//             </ResponsiveContainer>
//           </div>

//           {(totalQty &&
//             <div>

//               <h1>All In One Pvt ltd</h1>
//               <h2>Your Portfolio</h2>

//               <div style={{ width: "100%", height: "200px" }}>
//                 <ResponsiveContainer>
//                   <AreaChart data={userData}>
//                     <defs>
//                       <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
//                         <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
//                       </linearGradient>
//                     </defs>
//                     <XAxis tick={false} />
//                     <YAxis />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#111",
//                         border: "none",
//                         borderRadius: "8px",
//                         color: "#fff"
//                       }}
//                       labelStyle={{ display: "none" }}
//                       formatter={(value) => [`₹${value}`, "Price"]}
//                     />
//                     <Line dataKey="value" stroke='#25ff26' type={'linear'} isAnimationActive={false} dot={false} />

//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>

//               <p>Total Quantity: {totalQty}</p>
//               <p>Avg Buy Price: ₹{avgPrice ? avgPrice.toFixed(2) : 0}</p>
//               <p>Total Invested:₹{totalInvested}</p>
//               <p>Current Price: ₹{currentPrice}</p>

//             </div>
//           )}




//         </div>



//         <h2>Investment Growth Overview</h2>

//         <p style={{ maxWidth: "80%", lineHeight: "1.6", color: "#374151" }}>
//           At AllInOne Pvt Ltd, we continuously monitor and analyze investment trends
//           to ensure sustainable financial growth. The chart above represents a
//           simulated overview of our company’s share performance over time, highlighting
//           fluctuations, growth patterns, and market responsiveness.
//         </p>


//         <div style={{
//           display: "flex",
//           gap: "20px",
//           marginTop: "20px"
//         }}>
//           <div>
//             <h4>5 Year Growth</h4>
//             <p style={{ color: "green" }}>+245%</p>
//           </div>
//           <div>
//             <h4>Average Monthly Return</h4>
//             <p>8.2%</p>
//           </div>
//           <div>
//             <h4>Volatility Index</h4>
//             <p>Moderate</p>
//           </div>

//           <div>
//             <h4>Live Status</h4>
//             <h3 style={{
//               width: "120px",
//               height: "60px",
//               backgroundColor: currentSharePriceStatus ? "#16a34a" : "#dc2626",
//               color: "#fff",
//               borderRadius: "8px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: "6px"
//             }}>
//               {currentSharePriceStatus ? "▲ " : "▼ "}
//               {currentPrice}
//             </h3>
//           </div>

//           <div style={{
//             display: "flex",
//             gap: "20px",
//             marginTop: "20px"
//           }}>

//             <button onClick={() => handleBuy()} style={{
//               flex: 1,
//               padding: "12px",
//               background: "linear-gradient(135deg, #22c55e, #16a34a)",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontWeight: "600",
//               fontSize: "14px"
//             }}>
//               Buy Stock
//             </button>

//             <input ref={quantity} type='number' min="1" placeholder="Enter quantity" />

//             <button onClick={() => handleSell()} style={{

//               flex: 1,
//               padding: "12px",
//               background: "linear-gradient(135deg, #ef4444, #dc2626)",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontWeight: "600",
//               fontSize: "14px"
//             }}>
//               Sell Stock
//             </button>

//           </div>
//         </div>

//         <p style={{ maxWidth: "80%", lineHeight: "1.6", color: "#374151" }}>
//           Over the past 5 years, our investment strategy has delivered consistent
//           upward momentum, with calculated risks and data-driven decisions contributing
//           to long-term value creation. While short-term variations are expected,
//           the overall trajectory demonstrates resilience and steady progress.
//         </p>

//         <p style={{ maxWidth: "80%", lineHeight: "1.6", color: "#374151" }}>
//           This visualization is intended for demonstration purposes and reflects
//           sample data designed to showcase analytical capabilities within our platform.
//           Real-time insights and advanced forecasting tools are integrated into our
//           system to empower better financial decision-making.
//         </p>

//         <div class="container my-5">
//           <div class="card shadow-lg border-0">
//             <div class="card-body p-5">

//               {/* <!-- Title --> */}
//               <h2 class="text-center fw-bold mb-3">Future Expansion Vision</h2>
//               <p class="text-center text-muted mb-5">
//                 Building an integrated infrastructure and social development enterprise driving energy, water, logistics, and human capital growth at national and global scale.
//               </p>

//               <div class="row g-4">

//                 {/* <!-- Energy --> */}
//                 <div class="col-md-6">
//                   <h5 class="fw-bold text-primary">⚡ Energy & Utilities</h5>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">Integrated Solar Manufacturing & Power Generation</li>
//                     <li class="list-group-item">Hybrid Renewable Energy Parks (Solar, Wind & Storage)</li>
//                     <li class="list-group-item">Nuclear Energy Support Infrastructure (PPP Model)</li>
//                     <li class="list-group-item">Oil Refining & Petrochemical Development (JV-Based)</li>
//                   </ul>
//                 </div>

//                 {/* <!-- Water --> */}
//                 <div class="col-md-6">
//                   <h5 class="fw-bold text-info">💧 Water & Environmental Infrastructure</h5>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">National Water Infrastructure Projects</li>
//                     <li class="list-group-item">Seawater Desalination Plants</li>
//                     <li class="list-group-item">Village-Level Water Purification Systems</li>
//                   </ul>
//                 </div>

//                 {/* <!-- Infra --> */}
//                 <div class="col-md-6">
//                   <h5 class="fw-bold text-success">🚢 Infrastructure & Logistics</h5>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">National Logistics, Warehousing & Port Infrastructure</li>
//                     <li class="list-group-item">Smart City Infrastructure Development</li>
//                     <li class="list-group-item">International Infrastructure Projects (Africa & SE Asia)</li>
//                   </ul>
//                 </div>

//                 {/* <!-- Agriculture --> */}
//                 <div class="col-md-6">
//                   <h5 class="fw-bold text-warning">🌾 Agriculture & Food Systems</h5>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">Agri-Processing & Food Export Zones</li>
//                     <li class="list-group-item">Farmer-to-Consumer Direct Market Network</li>
//                   </ul>
//                 </div>

//                 {/* <!-- Trade --> */}
//                 <div class="col-md-6">
//                   <h5 class="fw-bold text-dark">🌍 Trade & Natural Resources</h5>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">Import–Export & Global Trade Hubs</li>
//                     <li class="list-group-item">Natural Resource Management (Mining & Processing)</li>
//                   </ul>
//                 </div>

//                 {/* <!-- Social --> */}
//                 <div class="col-md-6">
//                   <h5 class="fw-bold text-danger">🏥 Social Infrastructure & Welfare</h5>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">Affordable Hospital Network & Medical Colleges</li>
//                     <li class="list-group-item">Education Ecosystem (Schools & Skill Universities)</li>
//                     <li class="list-group-item">Integrated Ashram Network (Children & Elderly Care)</li>
//                   </ul>
//                 </div>

//                 {/* <!-- Employment --> */}
//                 <div class="col-md-6">
//                   <h5 class="fw-bold text-secondary">💼 Employment & Human Capital</h5>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">National Skill Development & Employment Program</li>
//                   </ul>
//                 </div>

//                 {/* <!-- Support --> */}
//                 <div class="col-md-6">
//                   <h5 class="fw-bold text-muted">🛡️ Digital Support & Safety Systems</h5>
//                   <ul class="list-group list-group-flush">
//                     <li class="list-group-item">Disaster Alert & Emergency Response Systems</li>
//                     <li class="list-group-item">Secure Housing & Rental Verification Platform</li>
//                   </ul>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>

//       </main>





//       <div style={{}}>



//       </div>
//     </div>
//   )
// }

// export default InvestOnUS




import React, { useEffect, useRef, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/authContext/useAuth';

const InvestOnUS = () => {
  const { stockQuantity, stockPrice, user, authDispatch } = useAuth();
  const navigate = useNavigate();

  // Original data preserved
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

  // 20+ Business Categories
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
  const totalQty = stockQuantity.reduce((item, acc) => item + acc, 0);
  const totalInvested = (stockPrice.map((price, index) => price * stockQuantity[index])).reduce((item, acc) => item + acc, 0);
  const avgPrice = totalInvested / totalQty;
  const quantity = useRef(null);

  const handleBuy = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const qty = Number(quantity.current.value);
    if (!qty || qty < 1) {
      alert("Enter valid quantity");
      return;
    }
    authDispatch({ type: "STOCK_BUY", payload: { sq: quantity.current.value, sp: currentPrice } })
  }

  const handleSell = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    authDispatch({ type: "STOCK_SELL", payload: { sq: quantity.current.value, sp: currentPrice } })
  }

  const isProfit = userData[userData.length - 1]?.value >= userData[0]?.value;
  const strokeColor = isProfit ? "#10B981" : "#EF4444";
  const profitLoss = totalQty > 0 ? (currentPrice - avgPrice) * totalQty : 0;

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#F8FAFC",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#1E293B"
    }}>
      {/* Simple Clean Header */}
      <div style={{
        backgroundColor: "white",
        borderBottom: "1px solid #E2E8F0",
        padding: "20px 40px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <div style={{ textAlign: "right" }}>

            {!user && (
              <button
                onClick={() => navigate('/login')}
                style={{
                  marginLeft: "16px",
                  padding: "8px 20px",
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                Login to Trade
              </button>
            )}
          </div>
        </div>
      </div>

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