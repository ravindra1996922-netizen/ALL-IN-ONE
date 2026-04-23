import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
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

  const handleLogout = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <>
      {/* Internal CSS */}
      <style>
        {`
          .custom-nav .nav-link {
            color: #555;
            font-weight: 500;
            letter-spacing: 0.5px;
            position: relative;
            transition: all 0.3s ease;
          }

          .custom-nav .nav-link:hover {
            color: #000 !important;
            font-weight: 600;
            letter-spacing: 1px;
            transform: translateY(-2px);
          }

          .custom-nav .nav-link::after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: -4px;
            width: 0%;
            height: 2px;
            background-color: #000;
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }

          .custom-nav .nav-link:hover::after {
            width: 60%;
          }

          .custom-nav .nav-link.active {
            color: #000 !important;
            font-weight: 600;
          }

          .custom-nav .nav-link.active::after {
            width: 60%;
          }
        `}
      </style>

      <nav
        className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"
        style={{ height: "55px" }}
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

          {/* Toggle */}
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
            <ul className="navbar-nav mx-auto gap-lg-4 text-center custom-nav">

              <li className="nav-item">
                <NavLink
                  to="/invest"
                  end
                  className="nav-link"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Invest
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/shopping"
                  end
                  className="nav-link"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    productDispatch({ type: "SET_CATEGORY", payload: "all" });
                  }}
                >
                  Shop
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/orderFood"
                  end
                  className="nav-link"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Order Food
                </NavLink>
              </li>

            </ul>

            {/* Right Side */}
            <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-dark text-decoration-none"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="btn text-white"
                    style={{ background: "#008060" }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <NavLink
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
                  </NavLink>

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
    </>
  );
};

export default Navbar;
