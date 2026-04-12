// src/components/Investment/InvestmentDashboard.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';
import { 
  FaBriefcase, FaSearch, FaBell, FaComments,
  FaArrowUp
} from 'react-icons/fa';
import './Investment.css';

// Chart Data
const portfolioData = [
  { month: 'Jan', value: 20000 },
  { month: 'Feb', value: 22000 },
  { month: 'Mar', value: 19000 },
  { month: 'Apr', value: 24000 },
  { month: 'May', value: 23000 },
  { month: 'Jun', value: 25400 },
];

const growthData = [
  { day: '1', value: 100 },
  { day: '5', value: 120 },
  { day: '10', value: 115 },
  { day: '15', value: 140 },
  { day: '20', value: 135 },
  { day: '25', value: 160 },
  { day: '30', value: 155 },
];

const assetData = [
  { name: 'Stocks', value: 45 },
  { name: 'Bonds', value: 25 },
  { name: 'Real Estate', value: 20 },
  { name: 'Crypto', value: 10 },
];

const COLORS = ['#4a5c2f', '#6b7c3f', '#8fa05a', '#b8c98a'];

const InvestmentDashboard = () => {
  return (
    <div className="section-card investment-section">
      
      {/* Header */}
      <div className="section-header">
        <div className="d-flex align-items-center gap-2">
          <FaBriefcase className="section-icon" />
          <h5 className="section-title">Investment Dashboard</h5>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="mini-search">
            <FaSearch size={11} />
            <input placeholder="Search" />
          </div>
          <FaBell className="header-icon" />
          <FaComments className="header-icon" />
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="portfolio-overview">
        <h6 className="subsection-title">Portfolio Overview</h6>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div className="portfolio-stat">
              <span className="stat-label">Total Value:</span>
              <span className="stat-value">$25,400</span>
            </div>
            <div className="portfolio-stat">
              <span className="stat-label">Total Gain:</span>
              <span className="stat-gain">
                <FaArrowUp size={11} /> +8.4%
              </span>
            </div>
          </div>
          <div style={{ width: '120px', height: '80px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4a5c2f" 
                  fill="#c8d5b0"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ width: '80px', height: '80px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={35}
                  dataKey="value"
                >
                  {assetData.map((entry, index) => (
                    <Cell 
                      key={index} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-3 mt-1">
        
        {/* Growth Chart */}
        <div className="col-md-6">
          <div className="chart-card">
            <h6 className="chart-title">Growth Chart</h6>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 10 }} 
                  axisLine={false}
                />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '12px', 
                    borderRadius: '8px' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4a5c2f" 
                  fill="#c8d5b0"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="col-md-6">
          <div className="chart-card">
            <h6 className="chart-title">Asset Allocation</h6>
            <div className="d-flex align-items-center gap-2">
              <ResponsiveContainer width="60%" height={130}>
                <PieChart>
                  <Pie
                    data={assetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    dataKey="value"
                  >
                    {assetData.map((entry, index) => (
                      <Cell 
                        key={index} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="legend">
                {assetData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <span 
                      className="legend-dot"
                      style={{ background: COLORS[index] }}
                    ></span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-primary-custom flex-fill">
          Invest More
        </button>
        <button className="btn btn-outline-custom flex-fill">
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default InvestmentDashboard;