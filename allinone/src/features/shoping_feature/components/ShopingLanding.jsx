import React, { useEffect, useState } from "react";
import { useProducts } from "../../../context/product_context/useProducts";
import { getAllCategoryPreview } from "../shopingDataModel/buildShopingmodel";
import { FaShoppingCart } from "react-icons/fa";
import FeatureCard from "../../../components/ui/FeatureCard";
import { useNavigate } from "react-router-dom";
import FilterBar from "../../../components/ui/FilterBar";
import { useCart } from "../../../context/cartContext/useCart";
import { useAuth } from "../../../context/authContext/useAuth";
import { addToCartApi } from "../../../utils/api/cartApis/cartApis";
import { toast } from "react-toastify";

const ShopingLanding = () => {
  const {
    loading,
    error,
    productDispatch,
    selectedCategory,
    cache,
    displayProduct,
  } = useProducts();

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { cartDispatch } = useCart();

  const { user } = useAuth();
  // const userId = user.user.id;

  const previewData = getAllCategoryPreview(displayProduct);


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

 
  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  const handleAddToCart = async (item) => {
    if (!user?.id) {
      toast.error("Please login first", {
        style: {
          background: "#d03f3f",
          color: "black",
        },
      });
      return;
    }

    try {
      const updatedCart = await addToCartApi(user?.id, item);

      cartDispatch({
        type: "SET_CART",
        payload: updatedCart,
      });

      toast.success("Added to cart ", {
        style: {
          background: "green",
          color: "black",
        },
      });
    } catch (err) {
      toast.error("Failed to add item ", {
        style: {
          background: "#d03f3f",
          color: "black",
        },
      });
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4">Error: {error}</p>;

  return (
    <>
      <FilterBar searchText={searchText} setSearchText={setSearchText} />

      <div className="container my-4">
        <div className="bg-dark text-white p-5 rounded mb-5 text-center">
          <h1 className="fw-bold">Discover Your Perfect Products</h1>

          <p className="lead mb-2">
            Explore trending items across all categories
          </p>

          <p className="text-light mb-4">
            Best deals on fashion, electronics, home essentials & more — all in
            one place.
          </p>

          <button
            className="btn btn-warning fw-bold"
            onClick={scrollToProducts}
          >
            <FaShoppingCart /> Start Shopping
          </button>
        </div>

        <div id="products-section">
          {Object.keys(previewData).map((category) => (
            <div key={category} className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-capitalize">{category}</h4>

                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`/category/${category}`)}
                >
                  View All
                </button>
              </div>

              <div className="row">
                {previewData[category].map((item) => (
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopingLanding;
