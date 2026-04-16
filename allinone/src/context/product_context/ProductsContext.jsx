import React, { createContext, useReducer, useEffect } from "react";

import {
  ITEMS_PER_PAGE,
  PAGES_PER_FETCH,
  SERVER_LIMIT,
} from "../../utils/constant/constant";
import { fetchProducts } from "../../utils/api/ShoppingApis/shopProductApi";

// import { fetchProducts } from "../../features/shoping_feature/api/api";

const initialState = {
  cache: {},
  searchKey: {},
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

    case "FETCH_SUCCESS": {
      const updatedCache = {
        ...productState.cache,
        [action.payload.page]: action.payload.data,
      };

      const allProducts = Object.values(updatedCache).flat();

      return {
        ...productState,
        loading: false,
        cache: updatedCache,
        searchKey: buildSearchIndex(allProducts), // 🔥 build index
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

    default:
      return productState;
  }
}

export const ProductsContext = createContext();

const buildSearchIndex = (allProducts) => {
  const index = {};

  allProducts.forEach((product) => {
    const words = product.searchKey.toLowerCase().split(" ");

    words.forEach((word) => {
      if (!index[word]) {
        index[word] = [];
      }

      index[word].push(product.id);
    });
  });

  return index;
};

export const ProductsProvider = ({ children }) => {
  const [productState, ProductDispatch] = useReducer(
    productsReducer,
    initialState,
  );

  const { cache, currentPage, searchKey } = productState;

  const serverPage = Math.ceil(currentPage / PAGES_PER_FETCH);

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

  const allProducts = Object.values(cache).flat();

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const visibleProducts = allProducts.slice(start, end);

  const searchProducts = (value) => {
    if (!value) return visibleProducts;

    const words = value.toLowerCase().split(" ");

    let resultIds = searchKey[words[0]] || [];

    for (let i = 1; i < words.length; i++) {
      const ids = searchKey[words[i]] || [];

      resultIds = resultIds.filter((id) => ids.includes(id));
    }

    return allProducts.filter((product) => resultIds.includes(product.id));
  };

  return (
    <ProductsContext.Provider
      value={{
        ...productState,
        ProductDispatch,
        visibleProducts,
        searchProducts, // 🔥 ADDED
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
