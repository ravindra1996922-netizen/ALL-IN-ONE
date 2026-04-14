import React from 'react';

const FeatureCard = ({ title, image, children, badge }) => {
  return (
    <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
      <div className="card-body p-0">
        <h5 className="text-center py-3 m-0 fw-semibold">{title}</h5>
        <div className="position-relative">
          <img src={image} alt={title} className="w-100" style={{height:'220px', objectFit:'cover'}}/>
          {badge && (
            <span className="position-absolute top-0 end-0 m-2 badge rounded-pill p-3" style={{backgroundColor:'#008060'}}>
              {badge}
            </span>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
export default FeatureCard;