import React from "react";
const FeatureCard = ({ title, image, onClick, children, badge }) => {
  return (
    <div
      className="card shadow-sm h-100"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {" "}
      <div className="p-2 text-center" style={{ height: "60px" }}>
        {" "}
        <h6 className="m-0">{title}</h6>{" "}
      </div>{" "}
      <div
        className="d-flex align-items-center justify-content-center bg-light"
        style={{ height: "200px" }}
      >
        {" "}
        <img
          src={image}
          alt={title}
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />{" "}
      </div>{" "}
      {badge && (
        <div className="text-end p-2">
          {" "}
          <span className="badge bg-success">{badge}</span>{" "}
        </div>
      )}{" "}
      <div className="p-2 d-flex flex-column"> {children} </div>{" "}
    </div>
  );
};
export default FeatureCard;
