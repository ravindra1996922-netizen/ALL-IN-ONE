import { useContext } from "react";
import { PortfolioContext } from "./PortfolioContext";

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("Portfolio must be used within portfolioProvider");
  }

  return context;
}
