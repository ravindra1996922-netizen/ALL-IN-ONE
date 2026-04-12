import React, { createContext, useReducer, useEffect } from "react";

import {
  ITEMS_PER_PAGE,
  PAGES_PER_FETCH,
  SERVER_LIMIT,
} from "../../utils/constant/constant";
import { fetchProducts } from "../../features/shoping_feature/api/api";

const initialState = {
  cache: {},
  loading: false,
  error: null,
  currentPage: 1,
};

function productsReducer(productState, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...productState,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...productState,
        loading: false,
        cache: {
          ...productState.cache,
          [action.payload.page]: action.payload.data,
        },
      };

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

    default:
      return productState;
  }
}

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productState, ProductDispatch] = useReducer(
    productsReducer,
    initialState,
  );

  const { cache, currentPage } = productState;

  const serverPage = Math.ceil(currentPage / PAGES_PER_FETCH); 
  console.log(serverPage, "serverpage");

  useEffect(() => {
    const loadProducts = async () => {
      if (cache[serverPage]) return;

      ProductDispatch({ type: "FETCH_START" });

      try {
        const data = await fetchProducts(serverPage);

        ProductDispatch({
          type: "FETCH_SUCCESS",
          payload: { page: serverPage, data },
        });
      } catch (error) {
        ProductDispatch({
          type: "FETCH_ERROR",
          payload: error.message,
        });
      }
    };

    loadProducts();
  }, [serverPage]);

  // flatten cache
  const allProducts = Object.values(cache).flat();
  console.log(allProducts, "allproducts");

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  console.log(start, "start");
  console.log(end, "end");
  const visibleProducts = allProducts.slice(start, end);
  console.log(visibleProducts, "visibleProducts");

  return (
    <ProductsContext.Provider
      value={{
        ...productState,
        ProductDispatch,
        visibleProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
