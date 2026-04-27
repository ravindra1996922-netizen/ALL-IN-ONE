import React from "react";
import { useCart } from "../context/cartContext/useCart";
import { useAuth } from "../context/authContext/useAuth";
import {
  removeFromCartApi,
  updateQtyApi,
} from "../utils/api/cartApis/cartApis";
import { useOrder } from "../context/orderContext/useOrder";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartsPage = () => {
  const { cart, cartDispatch } = useCart();
  const { user } = useAuth();
  const { orderDispatch } = useOrder();
  const navigate = useNavigate();

  console.log(cart);

  const userId = user?.user?.id;

  const shoppingCategories = [
    "clothing",
    "shoes",
    "electronics",
    "home_appliance",
    "furniture",
    "beauty",
    "pet",
  ];

  // ======================
  // QTY UPDATE
  // ======================
  const handleInc = async (id) => {
    if (!userId) return;
    const updatedCart = await updateQtyApi(userId, id, "inc");
    cartDispatch({ type: "SET_CART", payload: updatedCart });
  };

  const handleDec = async (id) => {
    if (!userId) return;
    const updatedCart = await updateQtyApi(userId, id, "dec");
    cartDispatch({ type: "SET_CART", payload: updatedCart });
  };

  // ======================
  // REMOVE
  // ======================
  const handleRemove = async (id) => {
    try {
      if (!userId) return;

      const updatedCart = await removeFromCartApi(userId, id);

      cartDispatch({
        type: "SET_CART",
        payload: updatedCart,
      });
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  // ======================
  // CART SPLIT
  // ======================
  const foodCart = cart.filter(
    (item) =>
      item.category === "veg" ||
      item.category === "nonveg" ||
      item.category === "ingredient",
  );

  const shoppingCart = cart.filter((item) =>
    shoppingCategories.includes(item.category),
  );

  // ======================
  // TOTALS
  // ======================
  const foodTotal = foodCart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const shoppingTotal = shoppingCart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // ======================
  // FOOD PAY
  // ======================
  const handleFoodPay = async () => {
    if (!foodCart.length) return;

    const order = {
      id: Date.now(),
      type: "food",
      items: foodCart,
      total: foodTotal,
      status: "Order Confirmed",
    };

    orderDispatch({
      type: "ADD_ORDER",
      payload: {
        order,
        userId,
      },
    });

    // backend remove
    for (let item of foodCart) {
      await removeFromCartApi(userId, item.id);
    }

    // frontend sync (IMPORTANT FIX)
    const updatedCart = cart.filter(
      (item) =>
        item.category !== "veg" &&
        item.category !== "nonveg" &&
        item.category !== "ingredient",
    );

    cartDispatch({ type: "SET_CART", payload: updatedCart });

    toast.success("🍔 Food Order Confirmed");
    navigate("/orders");
  };

  // ======================
  // SHOPPING PAY
  // ======================
  const handleShoppingPay = async () => {
    if (!shoppingCart.length) return;

    const order = {
      id: Date.now(),
      type: "shopping",
      items: shoppingCart,
      total: shoppingTotal,
      status: "Order Confirmed",
    };

    orderDispatch({
      type: "ADD_ORDER",
      payload: {
        order,
        userId,
      },
    });

    for (let item of shoppingCart) {
      await removeFromCartApi(userId, item.id);
    }

    const updatedCart = cart.filter(
      (item) => !shoppingCategories.includes(item.category),
    );

    cartDispatch({ type: "SET_CART", payload: updatedCart });

    toast.success("🛍️ Shopping Order Confirmed");
    navigate("/orders");
  };

  // ======================
  // EMPTY
  // ======================
  if (cart.length === 0) {
    return <h3 className="text-center mt-5">🛒 Your cart is empty</h3>;
  }

  return (
    <div className="container my-5">
      {/* ================= SHOPPING ================= */}
      <div className="p-4 mb-5 bg-white rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>🛍️ Shopping Cart</h4>
          <h5 className="text-success">₹{shoppingTotal}</h5>
        </div>

        <div className="row">
          {shoppingCart.length === 0 ? (
            <p>No shopping items</p>
          ) : (
            shoppingCart.map((item) => (
              <div className="col-md-6 mb-3" key={item.id}>
                <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center rounded-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  <div className="ms-3 flex-grow-1">
                    <h6>{item.title}</h6>
                    <p className="text-success fw-bold">₹{item.price}</p>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleDec(item.id)}
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleInc(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {shoppingCart.length > 0 && (
          <div className="text-end mt-3">
            <button
              className="btn btn-dark px-4 py-2"
              onClick={handleShoppingPay}
            >
              Pay ₹{shoppingTotal}
            </button>
          </div>
        )}
      </div>

      {/* ================= FOOD ================= */}
      <div className="p-4 bg-white rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>🍔 Food Cart</h4>
          <h5 className="text-success">₹{foodTotal}</h5>
        </div>

        <div className="row">
          {foodCart.length === 0 ? (
            <p>No food items</p>
          ) : (
            foodCart.map((item) => (
              <div className="col-md-6 mb-3" key={item.id}>
                <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center rounded-4">
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  <div className="ms-3 flex-grow-1">
                    <h6>{item.name || item.title}</h6>
                    <p className="text-success fw-bold">₹{item.price}</p>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleDec(item.id)}
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleInc(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {foodCart.length > 0 && (
          <div className="text-end mt-3">
            <button
              className="btn btn-success px-4 py-2"
              onClick={handleFoodPay}
            >
              Order Food ₹{foodTotal}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartsPage;
