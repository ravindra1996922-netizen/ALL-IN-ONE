import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const initialState = {
  user: null,
  page:"home"
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

  // 🔥 1. Load user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      authDispatch({
        type: "LOGIN",
        payload: JSON.parse(storedUser),
      });
    }
  }, []);

  // 🔥 2. Sync state → localStorage
  useEffect(() => {
    if (authState.user) {
      localStorage.setItem("user", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [authState.user]);

  // 🔥 3. MULTI TAB SYNC (IMPORTANT PART)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const newUser = event.newValue;

        if (!newUser) {
          // 👉 logout in all tabs
          authDispatch({ type: "LOGOUT" });
        } else {
          // 👉 login sync (rare case)
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

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
