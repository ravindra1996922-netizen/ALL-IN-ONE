import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/useAuth";
import { useProducts } from "../../context/product_context/useProducts";
import { useCart } from "../../context/cartContext/useCart";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, authDispatch } = useAuth();
  const { productDispatch } = useProducts();
  const { cart } = useCart();
  const navigate = useNavigate();

  function badgeQuantity() {
    return cart.reduce((acc, curr) => {
      return acc + curr.qty;
    }, 0);
  }
  badgeQuantity();

  const handleLogout = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    toast.info("Logged out successfully", {
      style: {
        background: "#3579d1",
        color: "#100c0c",
      },
    });
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"
      style={{ minHeight: "55px" }}
    >
      <div className="container-fluid px-4 px-lg-5">
        {/* Logo */}
        <Link
          className="navbar-brand fs-4 fw-bold"
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          All In One
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          {/* Center Links */}
          <ul className="navbar-nav mx-auto gap-lg-4 text-center">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/invest"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Invest
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/shopping"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  productDispatch({
                    type: "SET_CATEGORY",
                    payload: "all",
                  });
                }}
              >
                Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/orderFood"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Order Food
              </Link>
            </li>
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-dark text-decoration-none"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn text-white"
                  style={{ background: "#008060" }}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/cart"
                  className="position-relative text-dark fs-5 d-flex align-items-center justify-content-center"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "#f1f1f1",
                  }}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <FiShoppingCart />

                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "8px" }}
                  >
                    {badgeQuantity()}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm px-3 rounded-pill"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
