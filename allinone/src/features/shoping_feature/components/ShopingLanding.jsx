import React, { useEffect, useState } from "react";
import { useProducts } from "../../../context/product_context/useProducts";
import { getAllCategoryPreview } from "../shopingDataModel/buildShopingmodel";
import FeatureCard from "../../../components/ui/FeatureCard";
import { useNavigate } from "react-router-dom";
import FilterBar from "../../../components/ui/FilterBar";
import { useCart } from "../../../context/cartContext/useCart";
import { useAuth } from "../../../context/authContext/useAuth";
import { addToCartApi } from "../../../utils/api/cartApis/cartApis";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

/* 👉 IMAGES (CHANGE ONLY HERE LATER) */
import img1 from "../../../assets/images/shpw.jpg";
import img2 from "../../../assets/images/shopi.jpeg";

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();
  const { cartDispatch } = useCart();
  const { user } = useAuth();

  const userId = user?.user?.id;

  const safeProducts = Array.isArray(displayProduct) ? displayProduct : [];
  const previewData = getAllCategoryPreview(safeProducts);

  /* 👉 CAROUSEL SLIDES */
  const slides = [
    {
      image: img1,
      title: "Shop Smarter",
      subtitle: "Best Deals Online",
    },
    {
      image: img2,
      title: "Premium Products",
      subtitle: "At Best Price",
    },
  ];

  /* 👉 AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  /* FILTER */
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
  }, [searchText, selectedCategory]);

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = async (item) => {
    if (!userId) {
      toast.error("Please login first");
      return;
    }

    const updatedCart = await addToCartApi(userId, item);

    cartDispatch({
      type: "SET_CART",
      payload: updatedCart,
    });

    toast.success("Added to cart");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <FilterBar
        searchText={searchText}
        setSearchText={setSearchText}
        data={cache}
        dispatch={productDispatch}
        activeCategory={selectedCategory}
        type="shopping"
      />

      <div className="container my-4">
        {/* ================= HERO CAROUSEL ================= */}
        <div
          className="mb-5 rounded overflow-hidden position-relative"
          style={{ height: "300px" }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                opacity: i === currentSlide ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
            >
              {/* Background */}
              <div
                className="w-100 h-100"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 30%",
                }}
              />

              {/* Overlay */}
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" />

              {/* Content */}
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-center text-white">
                <div>
                  <h2 className="fw-bold">
                    {slide.title}{" "}
                    <span className="text-warning">{slide.subtitle}</span>
                  </h2>

                  <button
                    className="btn btn-warning mt-2"
                    onClick={scrollToProducts}
                  >
                    <FaShoppingCart /> Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PRODUCTS ================= */}
        <div id="products-section">
          {Object.keys(previewData).length === 0 ? (
            <p className="text-center">No products found</p>
          ) : (
            Object.keys(previewData).map((category) => (
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
                    <div className="col-md-3 mb-4" key={item.id}>
                      <FeatureCard title={item.title} image={item.image}>
                        <div className="d-flex flex-column h-100">
                          <p className="text-success fw-bold text-center mb-2">
                            ₹{item.price}
                          </p>

                          <button
                            className="btn btn-dark mt-auto w-100"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </FeatureCard>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ShopingLanding;
