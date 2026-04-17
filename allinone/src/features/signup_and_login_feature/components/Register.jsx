import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext/useAuth";

import Login_Register_Form from "./Login_Register_Form";
import { registerUser } from "../../../utils/api/authApis/authapis";

export default function Register() {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    await registerUser(data);
    alert("Registered successfully! now login");

    navigate("/login"); // auto redirect
  };

  return (
    <div className="page-container">
      <Login_Register_Form type="register" onSubmit={handleRegister} />

      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>go to Login</button>
      </p>
    </div>
  );
}
