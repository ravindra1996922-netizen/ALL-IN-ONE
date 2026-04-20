import React, { useEffect, useState } from "react";
import { useFood } from "../../../context/foodContext/useFood";
import { buildLandingData } from "../food-model/foodModel";
import { FaShoppingCart } from "react-icons/fa";
import FeatureCard from "../../../components/ui/FeatureCard";
import FilterBar from "../../../components/ui/FilterBar"; // ✅ IMPORT
import { useNavigate } from "react-router-dom";

const FoodLanding = () => {
  const {
    foodCache,
    recipesCache,
    loading,
    error,
    selectedCategory,
    foodDispatcher,
  } = useFood();

  const [searchFood, setSearchFood] = useState("");
  const navigate = useNavigate();

  const previewData = buildLandingData(foodCache, recipesCache);

  // ✅ FILTER LOGIC (same as shopping)
  useEffect(() => {
    const timer = setTimeout(() => {
      foodDispatcher({
        type: "FILTER_FOOD",
        payload: {
          search: searchFood,
          category: selectedCategory,
        },
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchFood, selectedCategory, foodDispatcher]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* ✅ REUSABLE FILTER BAR */}
      {/* <FilterBar
        data={foodCache}
        selectedCategory={selectedCategory}
        dispatch={foodDispatcher}
        searchText={searchFood}
        setSearchText={setSearchFood}
        type="food"
      /> */}

      <div className="container my-4">
        {/* HERO */}
        <div className="bg-dark text-white p-5 rounded mb-5 text-center">
          <h1 className="fw-bold">Order Your Favorite Food</h1>
          <p>Delicious meals & recipes in one place</p>
          <button className="btn btn-warning">
            <FaShoppingCart /> Order Now
          </button>
        </div>

        {/* PREVIEW SECTIONS */}
        {Object.keys(previewData).map((category) => (
          <div key={category} className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-capitalize">{category}</h4>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate(`/food/${category}`)} // ✅ food route
              >
                View All
              </button>
            </div>

            <div className="row">
              {previewData[category].map((item) => (
                <div className="col-md-3 mb-4 d-flex" key={item.id}>
                  <div className="w-100">
                    <FeatureCard title={item.name} image={item.image}>
                      <div className="d-flex flex-column h-100">
                        
                        <p className="text-success fw-bold text-center mb-2">
                          {category === "recipe" ? "" : `₹${item.price}`}
                        </p>

                        <button className="btn btn-dark btn-sm mt-auto w-100">
                          {category === "recipe"
                            ? "Show Recipe"
                            : "Add to Cart"}
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
    </>
  );
};

export default FoodLanding;