import React, { useEffect, useState } from "react";
import { useProducts } from "../../../context/product_context/useProducts";

const ShopingLanding = () => {
  const {
    visibleProducts,
    loading,
    error,
    currentPage,
    productDispatch,
    selectedCategory,
    cache,
  } = useProducts();

  const [searchText, setSearchText] = useState("");

  // ✅ categories generate
  const categories = ["all", ...new Set(cache.map((p) => p.category))];

  // 🔥 Debounce Search + Category
  useEffect(() => {
    const timer = setTimeout(() => {
      productDispatch({
        type: "FILTER_PRODUCTS",
        payload: {
          search: searchText,
          category: selectedCategory,
        },
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, selectedCategory, productDispatch]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Products</h1>

      {/* 🔥 CATEGORY BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              productDispatch({
                type: "SET_CATEGORY",
                payload: cat,
              })
            }
            style={{
              marginRight: 10,
              padding: "6px 12px",
              backgroundColor: selectedCategory === cat ? "black" : "lightgray",
              color: selectedCategory === cat ? "white" : "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔍 SEARCH */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={handleChange}
          style={{ padding: 8, width: 250 }}
        />
      </div>

      {/* 📦 PRODUCTS */}
      {visibleProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        visibleProducts.map((item) => (
          <div key={item.id}>
            {item.title} - ₹{item.price}
          </div>
        ))
      )}

      {/* 📄 PAGINATION */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() =>
            productDispatch({
              type: "SET_PAGE",
              payload: Math.max(currentPage - 1, 1),
            })
          }
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {currentPage}</span>

        <button
          onClick={() =>
            productDispatch({
              type: "SET_PAGE",
              payload: currentPage + 1,
            })
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ShopingLanding;
