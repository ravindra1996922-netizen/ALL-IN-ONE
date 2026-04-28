

import React, { createContext, useReducer } from "react";

const OrderContext = createContext();

const initialState = {
  orders: [],
};

const orderReducer = (state, action) => {
  switch (action.type) {

    case "ADD_ORDER": {
      const { order, userId } = action.payload;

      const updatedOrders = [order, ...state.orders];

      localStorage.setItem(`orders_${userId}`, JSON.stringify(updatedOrders));

      return {
        ...state,
        orders: updatedOrders,
      };
    }

    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };

    case "UPDATE_ORDER_STATUS": {
      const { orderId, status, userId } = action.payload;

      const updatedOrders = state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      );

      localStorage.setItem(`orders_${userId}`, JSON.stringify(updatedOrders));

      return {
        ...state,
        orders: updatedOrders,
      };
    }

    case "CLEAR_ORDERS":
      return {
        ...state,
        orders: [],
      };

    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, orderDispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ orders: state.orders, orderDispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
