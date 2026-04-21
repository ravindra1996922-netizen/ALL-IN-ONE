import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext/useAuth";
import Login_Register_Form from "./Login_Register_Form";
import { registerUser } from "../../../utils/api/authApis/authapis";
import {
  FaUserPlus,
  FaChartLine,
  FaShoppingCart,
  FaUtensils,
  FaBookOpen,
} from "react-icons/fa";
import heroImage from "../../../assets/images/allinonelogo.png";
import { toast } from "react-toastify";

export default function Register() {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await registerUser(data);

      toast.success("Registered successfully", {
        style: {
          background: "green",
          color: "black",
        },
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      // toast.error("Registration failed", {
      //   style: {
      //     background: "red",
      //     color: "black",
      //   },
      // });
    }
  };

  return (
    <div className="auth-wrapper container-fluid">
      <div className="row min-vh-100">
        <div className="col-md-7 d-none d-md-flex auth-left">
          <div className="text-white text-center p-5">
            <img
              src={heroImage}
              alt="All In One"
              style={{ width: "70%", maxWidth: "400px" }}
            />

            <h1 className="mt-4 fw-bold">Join All In One</h1>

            <p className="lead mt-2">
              Invest. Shop. Eat. Learn — One Platform. Infinite Possibilities.
            </p>

            <div className="d-flex align-items-center justify-content-center gap-3 mt-4 flex-wrap">
              <div className="text-center">
                <FaChartLine size={20} />
                <div style={{ fontSize: "12px" }}>Invest</div>
              </div>

              <span>→</span>

              <div className="text-center">
                <FaShoppingCart size={20} />
                <div style={{ fontSize: "12px" }}>Shop</div>
              </div>

              <span>→</span>

              <div className="text-center">
                <FaUtensils size={20} />
                <div style={{ fontSize: "12px" }}>Eat</div>
              </div>

              <span>→</span>

              <div className="text-center">
                <FaBookOpen size={20} />
                <div style={{ fontSize: "12px" }}>Learn</div>
              </div>
            </div>

            <div className="mt-4">
              <FaUserPlus size={40} />
            </div>
          </div>
        </div>

        <div className="col-md-5 d-flex align-items-center justify-content-center auth-right">
          <Login_Register_Form type="register" onSubmit={handleRegister} />
        </div>
      </div>

      <style>{`
        .auth-wrapper {
          overflow: hidden;
        }

        .auth-left,
        .auth-right {
          background: #0a1f44;
        }

        .auth-left {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
