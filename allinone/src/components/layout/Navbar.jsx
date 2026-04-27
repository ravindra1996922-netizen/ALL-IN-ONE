import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FiShoppingCart, FiPackage, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/authContext/useAuth";
import { useProducts } from "../../context/product_context/useProducts";
import { useCart } from "../../context/cartContext/useCart";
import { toast } from "react-toastify";
import { useFood } from "../../context/foodContext/useFood";

const Navbar = () => {
  const { user, authDispatch } = useAuth();
  const { productDispatch } = useProducts();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { foodDispatcher } = useFood();

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  const firstName =
    user?.user?.name?.split(" ")[0] || user?.user?.firstName || "User";

  const badgeQuantity = () => cart.reduce((acc, curr) => acc + curr.qty, 0);

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (type) => {
    const path = location.pathname;

    if (type === "shopping") {
      return path.startsWith("/shopping") || path.startsWith("/category");
    }

    if (type === "food") {
      return path.startsWith("/orderFood") || path.startsWith("/food");
    }

    if (type === "invest") {
      return path.startsWith("/invest");
    }

    return false;
  };

  const linkStyle = (type) => ({
    textDecoration: "none",
    color: isActive(type) ? "#000" : "#555",
    fontWeight: isActive(type) ? "700" : "500",
  });

  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"
      style={{ height: "55px" }}
    >
      <div className="container-fluid px-4 px-lg-5">
        <Link
          className="navbar-brand fs-4 fw-bold"
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          All In One
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav mx-auto gap-lg-4 text-center">
            <li>
              <NavLink
                to="/invest"
                style={linkStyle("invest")}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Invest
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/shopping"
                style={linkStyle("shopping")}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  productDispatch({ type: "SET_CATEGORY", payload: "all" });
                }}
              >
                Shop
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/orderFood"
                style={linkStyle("food")}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  foodDispatcher({ type: "SET_CATEGORY", payload: "all" });
                }}
              >
                Order Food
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-dark text-decoration-none"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn text-white"
                  style={{ background: "#008060" }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to="/cart"
                  className="position-relative d-flex align-items-center justify-content-center"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "#f1f1f1",
                  }}
                >
                  <FiShoppingCart />
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                    {badgeQuantity()}
                  </span>
                </NavLink>

                <div className="position-relative" ref={profileRef}>
                  <div
                    onClick={() => setOpenProfile(!openProfile)}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "#f1f1f1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {firstName[0]?.toUpperCase()}
                  </div>

                  {openProfile && (
                    <div
                      className="position-absolute bg-white shadow rounded"
                      style={{
                        right: 0,
                        top: "45px",
                        width: "200px",
                        zIndex: 1000,
                      }}
                    >
                      <div className="text-center py-2 border-bottom">
                        <div className="fw-bold">{firstName}</div>
                      </div>

                      <Link
                        to="/orders"
                        className="d-block px-3 py-2 text-dark text-decoration-none"
                        onClick={() => setOpenProfile(false)}
                      >
                        <FiPackage className="me-2" />
                        Your Orders
                      </Link>

                      <hr className="m-0" />

                      <button
                        className="btn w-100 text-start px-3 py-2"
                        onClick={handleLogout}
                      >
                        <FiLogOut className="me-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
