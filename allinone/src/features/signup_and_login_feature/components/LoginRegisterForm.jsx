import React, { useState } from "react";
import { toast } from "react-toastify";

const Login_Register_Form = ({ type, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    
    if (!form.email || !form.password || (type === "register" && !form.name)) {
      toast.error("All fields are required ", {
        style: { background: "red", color: "black" },
      });
      return;
    }


    onSubmit(form);
  };

  return (
    <div className="auth-card">
      <h3 className="mb-3 fw-bold text-center text-white">
        {type === "login" ? "Welcome Back" : "Create Account"}
      </h3>

      {type === "register" && (
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />
      )}

      <input
        className="form-control mb-3"
        type="email"
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
      />

      <input
        className="form-control mb-3"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button className="btn btn-dark w-100" onClick={handleSubmit}>
        {type === "login" ? "Login" : "Register"}
      </button>
    </div>
  );
};

export default Login_Register_Form;
