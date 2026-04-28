import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const FilterBar = ({
  searchText,
  setSearchText,
  data,
  dispatch,
  activeCategory,
  type = "shopping",
}) => {
  const navigate = useNavigate();

  const categories = ["all", ...new Set((data || []).map((p) => p.category))];

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
                dispatch({
                  type: "SET_CATEGORY",
                  payload: cat,
                });

                if (cat === "all") {
                  navigate(type === "food" ? "/orderFood" : "/shopping");
                } else {
                  navigate(
                    type === "food" ? `/food/${cat}` : `/category/${cat}`,
                  );
                }

                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`btn btn-sm ${
                activeCategory === cat ? "btn-dark" : "btn-light border"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: "250px", width: "100%" }}>
          <SearchBar
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={
              type === "food" ? "Search Food..." : "Search Products..."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
