import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext/useAuth";

const Navbar = () => {
  const { user, authDispatch } = useAuth();
  console.log(user);

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });

    // optional
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-2">
      <div className="container-fluid px-4 px-lg-5">
        <Link className="navbar-brand fs-4" to="/">
          All In One
        </Link>

        <div className="collapse navbar-collapse" id="nav">
          {/* menu */}
          <ul className="navbar-nav mx-auto gap-4">
            <li>
              <Link className="nav-link" to="/invest">
                Invest
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/shopping">
                Shop
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/orderFood">
                Eat
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/grocery">
                Grocery
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="text-dark text-decoration-none">
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn text-white"
                  style={{ background: "#008060" }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
