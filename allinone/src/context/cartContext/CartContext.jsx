import React, { createContext, useEffect, useReducer } from "react";
import { useAuth } from "../authContext/useAuth";
import { getCart } from "../../utils/api/cartApis/cartApis";

const CartContext = createContext();

const initialState = {
  cart: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "ADD_TO_CART": {
      const exist = state.cart.find((item) => item.id === action.payload.id);

      if (exist) {
        const updatedCart = state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item,
        );

        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, cartDispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      if (!user) return;

      try {
        const cartData = await getCart(user?.user.id);

        cartDispatch({
          type: "SET_CART",
          payload: cartData,
        });
      } catch (err) {
        console.error("Cart load error:", err);
      }
    };

    loadCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart: state.cart, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
