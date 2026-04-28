import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  page: "home",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log("run");
      if (event.key === "user") {
        const newUser = event.newValue;

        if (!newUser) {
          authDispatch({ type: "LOGOUT" });
        } else {
          authDispatch({
            type: "LOGIN",
            payload: JSON.parse(newUser),
          });
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (authState.user) {
      localStorage.setItem("user", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [authState.user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      authDispatch({
        type: "LOGIN",
        payload: JSON.parse(storedUser),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        user: authState.user,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
