import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "../authContext/useAuth";
import { getPortfolio } from "../../utils/api/PortfolioApis/portfolioapis";

const initialState = {
  portfolio: {
    stockQuantity: [],
    stockPrice: [],
  },
};

export const PortfolioContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET_FROM_DB":
      return {
        ...state,
        portfolio: {
          stockQuantity: [Number(action.payload.totalShares) || 0],
          stockPrice: [
            action.payload.totalShares > 0
              ? Number(action.payload.totalInvested) /
                Number(action.payload.totalShares)
              : 0,
          ],
        },
      };

    case "BUY_STOCK":
      return {
        ...state,
        portfolio: {
          stockQuantity: [
            ...state.portfolio.stockQuantity,
            Number(action.payload.qty),
          ],
          stockPrice: [
            ...state.portfolio.stockPrice,
            Number(action.payload.price),
          ],
        },
      };

    case "SELL_STOCK": {
      let sellQty = Number(action.payload.qty);

      let quantities = [...state.portfolio.stockQuantity];
      let prices = [...state.portfolio.stockPrice];

      let newQtyArr = [];
      let newPriceArr = [];

      for (let i = 0; i < quantities.length; i++) {
        if (sellQty <= 0) {
          newQtyArr.push(quantities[i]);
          newPriceArr.push(prices[i]);
        } else {
          if (quantities[i] <= sellQty) {
            sellQty -= quantities[i];
          } else {
            newQtyArr.push(quantities[i] - sellQty);
            newPriceArr.push(prices[i]);
            sellQty = 0;
          }
        }
      }

      return {
        ...state,
        portfolio: {
          stockQuantity: newQtyArr,
          stockPrice: newPriceArr,
        },
      };
    }

    case "RESET_PORTFOLIO":
      return initialState;

    default:
      return state;
  }
}

const PortfolioProvider = ({ children }) => {
  const [portfolioState, portfolioDispatch] = useReducer(reducer, initialState);
  const { stockQuantity, stockPrice } = portfolioState.portfolio;
  const { user } = useAuth();
  const userId = user?.user?.id;
  console.log(userId, "pfp");

  useEffect(() => {
    if (!userId) return;

    const s = async () => {
      try {
        const response = await getPortfolio(userId);
        console.log(response);
        portfolioDispatch({
          type: "SET_FROM_DB",
          payload: response,
        });
      } catch (err) {
        console.error(err);
      }
    };
    s();
  }, [userId]);

  return (
    <PortfolioContext.Provider
      value={{ stockQuantity, stockPrice, portfolioDispatch }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider;
