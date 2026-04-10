import React from "react";
import { useProducts } from "../../../../context/product_context/useProducts";

const ShopingLanding = () => {
  const { visibleProducts, loading, error, currentPage, ProductDispatch } =
    useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Products</h1>

      {visibleProducts.map((item) => (
        <div key={item.id}>{item.title || item.price}</div>
      ))}

      {/* Pagination */}
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
