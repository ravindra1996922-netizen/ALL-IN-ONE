import React, { useRef } from "react";
import { useProducts } from "../../../context/product_context/useProducts";

const ShopingLanding = () => {
  const { visibleProducts, loading, error, currentPage, ProductDispatch } =
    useProducts();

  const searchRef = useRef();

  const handleSearch = () => {
    const value = searchRef.current.value.trim().toLowerCase();

    ProductDispatch({
      type: "SET_SEARCH",
      payload: value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Products</h1>

      {/* 🔍 SEARCH INPUT */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search products..."
          ref={searchRef}
          onKeyDown={handleKeyDown}
          style={{ padding: 8, width: 250 }}
        />

        <button onClick={handleSearch} style={{ marginLeft: 10 }}>
          Search
        </button>
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
            ProductDispatch({
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
            ProductDispatch({
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
