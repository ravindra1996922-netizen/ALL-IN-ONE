import { useState, useRef } from "react";

export const useOrderSimulation = () => {
  const [foodStatus, setFoodStatus] = useState([]);
  const [shoppingStatus, setShoppingStatus] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const timeoutsRef = useRef([]);

  const foodSteps = [
    "Order Received",
    "Assigned to Chef",
    "Food is preparing",
    "Delivery boy coming",
    "Picked by delivery boy",
    "On the way",
    "Delivered",
  ];

  const shoppingSteps = [
    "Order Confirmed",
    "Packing",
    "Shipped",
    "Out for delivery",
    "Delivered",
  ];

  const clearSimulation = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // 🔥 generic runner
  const runSteps = (steps, setState) => {
    setState([]);

    steps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setState((prev) => [...prev, step]);
      }, index * 2000);

      timeoutsRef.current.push(timer);
    });
  };

  const startFoodOrder = () => {
    clearSimulation();
    setActiveOrder("food");
    runSteps(foodSteps, setFoodStatus);
  };

  const startShoppingOrder = () => {
    clearSimulation();
    setActiveOrder("shopping");
    runSteps(shoppingSteps, setShoppingStatus);
  };

 return {
  foodStatus,
  shoppingStatus,
  startFoodOrder,
  startShoppingOrder,
  activeOrder,   
};
};
