import React, { useEffect, useState } from "react";
import { useFood } from "../../../context/foodContext/useFood";
import { buildLandingData } from "../food-model/foodModel";
import FeatureCard from "../../../components/ui/FeatureCard";
import FilterBar from "../../../components/ui/FilterBar";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../../context/cartContext/useCart";
import { useAuth } from "../../../context/authContext/useAuth";
import { addToCartApi } from "../../../utils/api/cartApis/cartApis";
import { toast } from "react-toastify";
import foodImg from "../../../assets/images/food11.jpg";
import food2 from "../../../assets/images/food.jpg";

const groupByCategory = (data) => {
  const result = {};

  data.forEach((item) => {
    if (!result[item.category]) {
      result[item.category] = [];
    }
    result[item.category].push(item);
  });

  return result;
};

const FoodLanding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: foodImg,
      title: "Delicious Meals",
      subtitle: "Fresh & Hot Food",
    },
    {
      image: food2,
      title: "Healthy Recipes",
      subtitle: "Cook Like a Chef",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);
  const {
    foodCache,
    displayFoods,
    loading,
    error,
    selectedCategory,
    foodDispatcher,
  } = useFood();

  const [searchFood, setSearchFood] = useState("");
  const navigate = useNavigate();
  const { cartDispatch } = useCart();
  const { user } = useAuth();
  const userId = user?.user?.id;

  const isSearching = searchFood.trim() !== "";

  const previewData = isSearching
    ? groupByCategory(displayFoods)
    : buildLandingData(foodCache);

  useEffect(() => {
    const timer = setTimeout(() => {
      foodDispatcher({
        type: "FILTER_FOOD",
        payload: {
          search: searchFood,
          category: selectedCategory,
        },
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchFood, selectedCategory]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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

    const cartItem = {
      ...item,
      id: `food-${item.id}`,
      type: "food",
    };

    const updatedCart = await addToCartApi(userId, cartItem);

    cartDispatch({
      type: "SET_CART",
      payload: updatedCart,
    });

    toast.success("Item added to cart");
  };
  return (
    <>
      <FilterBar
        searchText={searchFood}
        setSearchText={setSearchFood}
        data={foodCache}
        dispatch={foodDispatcher}
        activeCategory={selectedCategory}
        type="food"
      />

      <div className="container my-4">
        <div
          className="mb-5 rounded overflow-hidden position-relative"
          style={{ height: "300px" }}
        >
          {slides.length > 0 && (
            <>
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    opacity: i === currentSlide ? 1 : 0,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  <div
                    className="w-100 h-100"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" />

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
            </>
          )}
        </div>
        <div id="products-section">
          {Object.keys(previewData)
            .filter((cat) => previewData[cat].length > 0)
            .map((category) => (
              <div key={category} className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-capitalize mb-0">{category}</h4>

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/food/${category}`)}
                  >
                    View All
                  </button>
                </div>

                <div className="row">
                  {previewData[category].map((item) => (
                    <div className="col-md-3 mb-4" key={item.id}>
                      <FeatureCard
                        title={item.name}
                        image={item.image}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          navigate(`/details/food/${item.id}`);
                        }}
                      >
                        <div className="d-flex flex-column h-100">
                          {item.type !== "recipe" && item.price && (
                            <p className="text-success fw-bold text-center mb-2">
                              ₹{item.price}
                            </p>
                          )}

                          {item.type === "recipe" ? (
                            <button
                              className="btn btn-info mt-auto w-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.scrollTo({ top: 0, behavior: "auto" });
                                navigate(`/details/food/${item.id}`);
                              }}
                            >
                              Show Recipe
                            </button>
                          ) : (
                            <button
                              className="btn btn-dark mt-auto w-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(item);
                              }}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </FeatureCard>
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

export default FoodLanding;
