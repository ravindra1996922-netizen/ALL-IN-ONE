import { useContext } from "react";
import { useTheme } from "./ThemeContext";


export const useProducts = () => {
  const context = useContext(useTheme);

  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }

  return context;
};
