import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext/useAuth";

import Login_Register_Form from "./Login_Register_Form";
import { loginUser } from "../../../utils/api/authApis/authapis";


export default function LoginForm() {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();

  const handleLogin = async (data) => {
    const user = await loginUser(data);

    if (user) {
      authDispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page-container">
      <Login_Register_Form type="login" onSubmit={handleLogin} />

      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>click to Register</button>
      </p>
    </div>
  );
}
