import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/product_context/useProducts";
import SearchBar from "./SearchBar";

const FilterBar = ({ searchText, setSearchText }) => {
  const { cache, selectedCategory, productDispatch } = useProducts();
  const navigate = useNavigate();

  const categories = ["all", ...new Set(cache.map((p) => p.category))];

  return (
    <div
      className="w-100 position-sticky bg-white shadow-sm"
      style={{ top: "55px", zIndex: 999 }}
    >
      <div className="px-3 py-2 border d-flex justify-content-between flex-wrap gap-2">
        
        <div className="d-flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                productDispatch({
                  type: "SET_CATEGORY",
                  payload: cat,
                });

                if (cat === "all") {
                  navigate("/shopping"); 
                } else {
                  navigate(`/category/${cat}`);
                }

                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`btn btn-sm ${
                selectedCategory === cat ? "btn-dark" : "btn-light border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      
        <div style={{ maxWidth: "250px", width: "100%" }}>
          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Products..."
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
