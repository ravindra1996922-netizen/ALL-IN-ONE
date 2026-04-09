import React from "react";
import { useAuth } from "../../../context/authContext/useAuth";
import { registerUser } from "../api/api";
import Login_Register_Form from "./Login_Register_Form";

export default function Register() {
  const { authDispatch } = useAuth();
  const handleRegister = async (data) => {
    await registerUser(data);
    alert("Registered successfully ! you can login now ");
    authDispatch({ type: "SET_PAGE", payload: "login" });
  };

  return (
    <div className="page-container">
      <Login_Register_Form
        type="register"
        onSubmit={handleRegister}
      ></Login_Register_Form>

      <p
        className="link"
        onClick={() => authDispatch({ type: "SET_PAGE", payload: "login" })}
      >
        Already have an account? <button> go to Login page </button>
      </p>
    </div>
  );
}
