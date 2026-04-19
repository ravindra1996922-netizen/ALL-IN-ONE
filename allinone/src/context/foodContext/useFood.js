import { useContext } from "react";
import { FoodContext } from "./FoodContext";


export function useFood() {
  const context = useContext(FoodContext);
  

  if (!context) {
    throw new Error("useFood must be used within FoodProvider");
  }

  return context;
}
