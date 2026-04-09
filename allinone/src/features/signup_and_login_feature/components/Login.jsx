import React from "react";
import { useAuth } from "../../../context/authContext/useAuth";
import { loginUser } from "../api/api";
import Login_Register_Form from "./Login_Register_Form";

export default function LoginForm() {
  const { authDispatch } = useAuth();

  const handleLogin = async (data) => {
    const user = await loginUser(data);

    if (user) {
      authDispatch({ type: "LOGIN", payload: user });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="page-container">
      <Login_Register_Form
        type="login"
        onSubmit={handleLogin}
      ></Login_Register_Form>

      <p
        className="link"
        onClick={() => authDispatch({ type: "SET_PAGE", payload: "register" })}
      >
        Don't have an account? <button>click to Register</button>
      </p>
    </div>
  );
}
