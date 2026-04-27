// import React, { createContext, useContext, useReducer } from "react";

// const OrderContext = createContext();

// const initialState = {
//   orders: [],
// };

// const orderReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_ORDER":
//       return {
//         ...state,
//         orders: [action.payload, ...state.orders],
//       };

//     case "CLEAR_ORDERS":
//       return {
//         ...state,
//         orders: [],
//       };

//     default:
//       return state;
//   }
// };

// export const OrderProvider = ({ children }) => {
//   const [state, orderDispatch] = useReducer(orderReducer, initialState);
//   const { orders } = state;

//   return (
//     <OrderContext.Provider value={{ orders, orderDispatch }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export default OrderContext;
import React, { createContext, useReducer } from "react";

const OrderContext = createContext();

const initialState = {
  orders: [],
};

const orderReducer = (state, action) => {
  switch (action.type) {
    /* ================= ADD ORDER ================= */
    case "ADD_ORDER": {
      const { order, userId } = action.payload;

      const updatedOrders = [order, ...state.orders];

      // ✅ USER BASED SAVE
      localStorage.setItem(`orders_${userId}`, JSON.stringify(updatedOrders));

      return {
        ...state,
        orders: updatedOrders,
      };
    }

    /* ================= LOAD ORDERS ================= */
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };

    /* ================= UPDATE STATUS ================= */
    case "UPDATE_ORDER_STATUS": {
      const { orderId, status, userId } = action.payload;

      const updatedOrders = state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      );

      // ✅ SAVE AGAIN (IMPORTANT)
      localStorage.setItem(`orders_${userId}`, JSON.stringify(updatedOrders));

      return {
        ...state,
        orders: updatedOrders,
      };
    }

    /* ================= CLEAR ================= */
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
