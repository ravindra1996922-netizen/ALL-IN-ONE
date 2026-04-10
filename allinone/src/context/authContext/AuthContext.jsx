import React, { createContext, useReducer, useEffect } from "react";
export const AuthContext = createContext();
const initialState = {
  user: null,
  page: "home",
};
function reducer(authState, action) {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      return { ...authState, user: action.payload };
    case "LOGOUT":
      return { ...authState, user: null, page: "home" };
    case "SET_PAGE":
      console.log(action.payload);
      return { ...authState, page: action.payload };

    default:
      return authState;
  }
}

export function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      authDispatch({ type: "LOGIN", payload: JSON.parse(stored) });
    }
  }, []);

  useEffect(() => {
    if (authState.user) {
      localStorage.setItem("user", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [authState.user]);


  useEffect(() => {
    const handleStorageChange = (event) => {
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

  return (
    <AuthContext.Provider
      value={{ user: authState.user, page: authState.page, authDispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}
