import React, { createContext, useReducer, useEffect } from "react";

import { ITEMS_PER_PAGE } from "../../utils/constant/constant";
import { fetchProducts } from "../../utils/api/ShoppingApis/shopProductApi";

const initialState = {
  cache: [],
  displayProduct: [],
  loading: false,
  error: null,
  currentPage: 1,
  selectedCategory: "all",
  showCategory: true,
};

function productsReducer(productState, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...productState,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS": {
      const updatedCache = [...productState.cache, ...action.payload];

      return {
        ...productState,
        loading: false,
        cache: updatedCache,
        displayProduct: updatedCache,
        error: null,
      };
    }

    case "FETCH_ERROR":
      return {
        ...productState,
        loading: false,
        error: action.payload,
      };

    case "SET_PAGE":
      return {
        ...productState,
        currentPage: action.payload,
      };

    case "SHOW_CATEGORY":
      return {
        ...productState,
        showCategory: action.payload,
      };

    case "SET_CATEGORY":
      return {
        ...productState,
        selectedCategory: action.payload,
      };

    case "FILTER_PRODUCTS": {
      const { search, category } = action.payload;

      let filtered = [...productState.cache];

      if (category !== "all") {
        filtered = filtered.filter((p) => p.category === category);
      }

      if (search) {
        filtered = filtered.filter((p) =>
          p.searchKey.toLowerCase().includes(search.toLowerCase()),
        );
      }

      return {
        ...productState,
        displayProduct: filtered,
        currentPage: 1,
      };
    }

    default:
      return productState;
  }
}

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(
    productsReducer,
    initialState,
  );

  const { displayProduct, cache, currentPage, selectedCategory } = productState;

  // console.log(selectedCategory, "selectedcatogory");

  useEffect(() => {
    const loadProducts = async () => {
      productDispatch({ type: "FETCH_START" });

      try {
        const data = await fetchProducts();

        productDispatch({
          type: "FETCH_SUCCESS",
          payload: data,
        });
      } catch (error) {
        productDispatch({
          type: "FETCH_ERROR",
          payload: error.message,
        });
      }
    };

    loadProducts();
  }, []);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const visibleProducts = displayProduct.slice(start, end);

  return (
    <ProductsContext.Provider
      value={{
        ...productState,
        cache,
        productDispatch,
        visibleProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};