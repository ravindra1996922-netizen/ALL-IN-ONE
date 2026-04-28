import React, { createContext, useEffect, useReducer } from "react";
import { fetchFoods, fetchRecipes } from "../../utils/api/FoodApi/foodApi";
import { buildUnifiedFoodData } from "../../features/food_feature/food-model/foodModel";

export const FoodContext = createContext();

const initialValue = {
  foodCache: [],
  displayFoods: [],
  loading: true,
  error: null,
  currentPage: 1,

  selectedCategory: "all",
  showCategory: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        foodCache: action.payload,
        displayFoods: action.payload,
      };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    case "FILTER_FOOD": {
      const { search, category } = action.payload;

      let filtered = [...state.foodCache];

      if (category !== "all") {
        filtered = filtered.filter((item) => item.category === category);
      }

      if (search) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      return {
        ...state,
        displayFoods: filtered,
        currentPage: 1,
      };
    }

    default:
      return state;
  }
}

const FoodProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: "FETCH_START" });
      console.log("fetch food start");

      try {
        const foods = await fetchFoods();
        const recipes = await fetchRecipes();
        console.log(foods, "food");
        console.log(recipes, "reci");

        const unifiedData = buildUnifiedFoodData(foods, recipes);
        console.log(unifiedData, "uni");

        dispatch({
          type: "FETCH_SUCCESS",
          payload: unifiedData,
        });
      } catch (err) {
        dispatch({
          type: "FETCH_ERROR",
          payload: err.message,
        });
      }
    };

    loadData();
  }, []);

  return (
    <FoodContext.Provider value={{ ...state, foodDispatcher: dispatch }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
