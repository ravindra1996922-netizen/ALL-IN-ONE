
import React, { useState } from 'react';
import { 
  FaTshirt, FaSearch, FaComments, 
  FaShoppingCart, FaPrint, FaStar,
  FaFilter, FaChevronDown
} from 'react-icons/fa';
import './Shoping.css';

const clothes = [
  { id: 1, name: 'Casual Jacket', price: '$59.99', rating: 4 },
  { id: 2, name: 'Summer Dress', price: '$49.99', rating: 4 },
  { id: 3, name: 'Polo Shirt', price: '$34.99', rating: 3 },
  { id: 4, name: 'Sneakers', price: '$69.99', rating: 5 },
  { id: 5, name: 'Handbag', price: '$39.99', rating: 4 },
  { id: 6, name: 'Cap', price: '$66.99', rating: 3 },
];

const Shopping = () => {
  const [priceRange, setPriceRange] = useState(50);

  return (
    <div className="section-card clothing-section">
      
      {/* Header */}
      <div className="section-header">
        <div className="d-flex align-items-center gap-2">
          <FaTshirt className="section-icon" />
          <h5 className="section-title">Clothing</h5>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="mini-search">
            <FaSearch size={11} />
            <input placeholder="Search" />
          </div>
          <FaComments className="header-icon" />
          <FaShoppingCart className="header-icon" />
          <FaPrint className="header-icon" />
        </div>
      </div>

      <div className="row g-0">
        
        {/* Filter Sidebar */}
        <div className="col-3">
          <div className="filter-sidebar">
            <div className="filter-header">
              <FaFilter size={12} />
              <span>Filter</span>
              <FaChevronDown size={10} className="ms-auto" />
            </div>
            
            <div className="filter-group">
              <div className="filter-label">Category</div>
              <FaChevronDown size={10} className="ms-auto" />
            </div>
            
            <div className="filter-group">
              <div className="filter-label">Price</div>
              <FaChevronDown size={10} className="ms-auto" />
            </div>
            
            <div className="price-slider-container">
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="price-slider"
              />
            </div>
            
            <div className="filter-group">
              <div className="filter-label">Rating</div>
              <FaChevronDown size={10} className="ms-auto" />
            </div>
            
            <div className="star-filter">
              {[1,2,3,4,5].map(s => (
                <FaStar key={s} size={12} color="#ccc" />
              ))}
            </div>
            <div className="star-filter mt-1">
              {[1,2,3,4,5].map(s => (
                <FaStar key={s} size={12} color="#ccc" />
              ))}
            </div>

            <div className="filter-group mt-2">
              <div className="filter-label">Rating</div>
              <FaChevronDown size={10} className="ms-auto" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-9">
          {/* Sort Bar */}
          <div className="sort-bar">
            <button className="sort-btn">
              Estoy <FaChevronDown size={9} />
            </button>
            <button className="sort-btn">
              Price <FaChevronDown size={9} />
            </button>
            <button className="sort-btn">
              Rating <FaChevronDown size={9} />
            </button>
            <button className="sort-btn">
              Rating <FaChevronDown size={9} />
            </button>
          </div>

          <div className="row g-2">
            {clothes.map((item) => (
              <div key={item.id} className="col-4">
                <div className="cloth-card">
                  <div className="cloth-img">
                    <div className="cloth-placeholder">
                      <FaTshirt size={30} color="#ccc" />
                    </div>
                    <div className="add-badge">1ρ</div>
                  </div>
                  <div className="cloth-info">
                    <p className="cloth-name">{item.name}</p>
                    <p className="cloth-price">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping;