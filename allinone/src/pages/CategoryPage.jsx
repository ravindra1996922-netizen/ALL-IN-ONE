import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/product_context/useProducts";
import FeatureCard from "../components/ui/FeatureCard";
import FilterBar from "../components/ui/FilterBar";
import { ITEMS_PER_PAGE } from "../utils/constant/constant";
import { useCart } from "../context/cartContext/useCart";
import { useAuth } from "../context/authContext/useAuth";
import { addToCartApi } from "../utils/api/cartApis/cartApis";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { name } = useParams();
  const { cache, productDispatch } = useProducts();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { cartDispatch } = useCart();

  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (name === "all") return;

    productDispatch({
      type: "SET_CATEGORY",
      payload: name,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(1);
  }, [name]);

  const filteredProducts = cache.filter((item) => {
    const matchCategory = name === "all" || item.category === name;

    const matchSearch = item.searchKey
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(start, end);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const handleAddToCart = async (item) => {
    if (userId) {
      toast.error("Please login first to add items in cart", {
        style: {
          background: "red",
          color: "black",
        },
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
      <FilterBar searchText={searchText} setSearchText={setSearchText} />

      <div className="container my-4">
        <h3 className="mb-4 text-capitalize">{name} Products</h3>

        <div className="row">
          {paginatedProducts.map((item) => (
            <div className="col-md-3 mb-4 d-flex" key={item.id}>
              <div className="w-100">
                <FeatureCard title={item.title} image={item.image}>
                  <div className="d-flex flex-column h-100">
                    <p className="text-success fw-bold text-center mb-2">
                      ₹{item.price}
                    </p>

                    <button
                      className="btn btn-dark btn-sm mt-auto w-100"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </FeatureCard>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length > ITEMS_PER_PAGE && (
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
