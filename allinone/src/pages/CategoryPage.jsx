import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/product_context/useProducts";
import { useFood } from "../context/foodContext/useFood";
import FeatureCard from "../components/ui/FeatureCard";
import FilterBar from "../components/ui/FilterBar";
import { ITEMS_PER_PAGE } from "../utils/constant/constant";
import { useCart } from "../context/cartContext/useCart";
import { useAuth } from "../context/authContext/useAuth";
import { addToCartApi } from "../utils/api/cartApis/cartApis";
import { toast } from "react-toastify";

const CategoryPage = ({ type = "shopping" }) => {
  const { name } = useParams();

  // ✅ BOTH CONTEXTS
  const productCtx = useProducts();
  const foodCtx = useFood();

  // ✅ SELECT CONTEXT BASED ON TYPE
  const ctx = type === "shopping" ? productCtx : foodCtx;

  const cache = ctx.cache || ctx.foodCache || [];
  const dispatch = ctx.productDispatch || ctx.foodDispatcher;
  const selectedCategory = ctx.selectedCategory;

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { cartDispatch } = useCart();
  const { user } = useAuth();
  const userId = user?.user?.id;

  // ✅ SET CATEGORY FROM URL
  useEffect(() => {
    if (!name) return;

    dispatch({
      type: "SET_CATEGORY",
      payload: name,
    });

    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [name]);

  // ✅ FILTER LOGIC (FIXED)
  const filteredData = cache.filter((item) => {
    const matchCategory = name === "all" || item.category === name;

    const matchSearch = (item.name || item.title || "")
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });

  // ✅ PAGINATION
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(start, start + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  // ✅ CART HANDLER
  const handleAddToCart = async (item) => {
    if (!user?.user?.id) {
      toast.error("Please login first", {
        style: { background: "red", color: "black" },
      });
      return;
    }

    const updatedCart = await addToCartApi(userId, item);

    cartDispatch({
      type: "SET_CART",
      payload: updatedCart,
    });

    toast.success("Item added to cart", {
      style: { background: "green", color: "black" },
    });
  };

  return (
    <>
      {/* ✅ FILTER BAR */}
      <FilterBar
        searchText={searchText}
        setSearchText={setSearchText}
        data={cache}
        dispatch={dispatch}
        activeCategory={selectedCategory}
        type={type} // 🔥 IMPORTANT
      />

      <div className="container my-4">
        <h3 className="mb-4 text-capitalize">{name} Items</h3>

        {/* ❌ NO DATA CASE */}
        {filteredData.length === 0 ? (
          <p className="text-center">No items found</p>
        ) : (
          <div className="row">
            {paginatedData.map((item) => (
              <div className="col-md-3 mb-4 d-flex" key={item.id}>
                <div className="w-100">
                  <FeatureCard
                    title={item.title || item.name}
                    image={item.image}
                  >
                    <div className="d-flex flex-column h-100">
                      {/* ✅ PRICE */}
                      {item.price && (
                        <p className="text-success fw-bold text-center mb-2">
                          ₹{item.price}
                        </p>
                      )}

                      {/* 🔥 BUTTON LOGIC */}
                      {type === "food" && item.type === "recipe" ? (
                        <button className="btn btn-info mt-auto w-100">
                          Show Recipe
                        </button>
                      ) : (
                        <button
                          className="btn btn-dark mt-auto w-100"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </FeatureCard>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ PAGINATION */}
        {filteredData.length > ITEMS_PER_PAGE && (
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            {currentPage > 1 && (
              <button
                className="btn btn-outline-dark"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                ◀ Prev
              </button>
            )}

            <span className="fw-bold">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages && (
              <button
                className="btn btn-outline-dark"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next ▶
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
