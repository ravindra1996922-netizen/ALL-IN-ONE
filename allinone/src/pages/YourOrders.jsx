import React, { useEffect } from "react";
import { useOrder } from "../context/orderContext/useOrder";
import { useAuth } from "../context/authContext/useAuth";

const YourOrders = () => {
  const { orders, orderDispatch } = useOrder();
  const { user } = useAuth();

  const userId = user?.user?.id;

  const foodSteps = [
    "Order Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];

  const shoppingSteps = [
    "Order Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  /* ================= SIMULATION ================= */
  useEffect(() => {
    if (!orders.length || !userId) return;

    orders.forEach((order) => {
      if (order.status === "Delivered") return;

      const steps = order.type === "food" ? foodSteps : shoppingSteps;
      const currentIndex = steps.indexOf(order.status);

      if (currentIndex === -1) return;

      const timer = setTimeout(() => {
        const nextStatus = steps[currentIndex + 1];

        orderDispatch({
          type: "UPDATE_ORDER_STATUS",
          payload: {
            orderId: order.id,
            status: nextStatus,
            userId,
          },
        });
      }, 4000);

      return () => clearTimeout(timer);
    });
  }, [orders, userId]);

  if (!orders.length) {
    return (
      <div className="text-center mt-5">
        <h3>📦 No Orders Yet</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">📦 Your Orders</h2>

      {orders.map((order) => {
        const steps = order.type === "food" ? foodSteps : shoppingSteps;
        const currentStep = steps.indexOf(order.status);

        return (
          <div
            key={order.id}
            className="card p-4 mb-4 shadow-sm border-0 rounded-4"
          >
            {/* HEADER */}
            <div className="d-flex justify-content-between mb-3">
              <h5>
                {order.type === "food" ? "🍔 Food Order" : "🛍️ Shopping Order"}
              </h5>
              <span className="fw-bold text-success">₹{order.total}</span>
            </div>

            {/* ================= 2 COLUMN LAYOUT ================= */}
            <div className="row">
              {/* ================= LEFT → ITEMS ================= */}
              <div className="col-md-7">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center border rounded p-3 mb-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name || item.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />

                    <div className="ms-3">
                      <h6 className="mb-1">{item.name || item.title}</h6>
                      <p className="mb-1 text-muted">Qty: {item.qty}</p>
                      <p className="mb-0 text-success fw-bold">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= RIGHT → TRACKING ================= */}
              <div className="col-md-5">
                <div className="border rounded p-3 h-100">
                  <p className="fw-bold text-primary">
                    Current Status: {order.status}
                  </p>

                  <div className="mt-4">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-3"
                      >
                        {/* DOT */}
                        <div
                          style={{
                            height: "12px",
                            width: "12px",
                            borderRadius: "50%",
                            background:
                              index <= currentStep ? "#28a745" : "#ccc",
                          }}
                        ></div>

                        {/* LINE */}
                        <div
                          style={{
                            width: "30px",
                            height: "2px",
                            background:
                              index < currentStep ? "#28a745" : "#ccc",
                          }}
                        ></div>

                        {/* TEXT */}
                        <p
                          className={`mb-0 ${
                            index <= currentStep
                              ? "text-success fw-bold"
                              : "text-muted"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default YourOrders;
