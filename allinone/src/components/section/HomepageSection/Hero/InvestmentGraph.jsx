// src/components/Hero/InvestmentGraph.jsx
import React, { useEffect, useState } from "react";

const InvestmentGraph = ({ slide }) => {
  const [animatedValues, setAnimatedValues] = useState(
    slide.graphData.map(() => 0),
  );
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(slide.graphData);
    }, 300);
    return () => clearTimeout(timer);
  }, [slide]);

  const maxVal = Math.max(...slide.graphData);

  return (
    <div className="investment-graph-container">
      {/* Graph Header */}
      <div className="graph-header">
        <div className="graph-title-section">
          <h4 className="graph-title">Portfolio Growth 2026</h4>
          <span className="graph-live-badge">● LIVE</span>
        </div>
        <div className="graph-return-badge">
          +{slide.stats[0].value} Avg Returns
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bar-chart">
        {slide.graphData.map((val, i) => (
          <div
            key={i}
            className="bar-column"
            onMouseEnter={() => setHoveredBar(i)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            {/* Tooltip */}
            {hoveredBar === i && <div className="bar-tooltip">+{val}%</div>}
            {/* Bar Fill */}
            <div
              className="bar-fill"
              style={{
                height: `${(animatedValues[i] / maxVal) * 100}%`,
                backgroundColor: hoveredBar === i ? "#fdcb6e" : "#00b894",
                boxShadow:
                  hoveredBar === i ? "0 0 15px #fdcb6e" : "0 0 8px #00b89455",
              }}
            ></div>
            {/* Label */}
            <span className="bar-label">{slide.graphLabels[i]}</span>
          </div>
        ))}
      </div>

      {/* New Businesses Section */}
      <div className="new-businesses-section">
        <h5 className="nb-title">🚀 20 New Businesses Launching Soon</h5>
        <div className="nb-grid">
          {slide.businesses.map((biz, i) => (
            <div key={i} className="nb-item">
              <span className="nb-name">{biz.name}</span>
              <span className="nb-growth">{biz.growth}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Invest CTA inside graph card */}
      <div className="graph-cta">
        <span className="graph-cta-text">
          🔥 Early investors getting <strong>2x returns</strong>
        </span>
      </div>
    </div>
  );
};

export default InvestmentGraph;
