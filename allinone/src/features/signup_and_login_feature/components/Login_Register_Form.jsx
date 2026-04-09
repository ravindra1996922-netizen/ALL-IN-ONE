
import React, { useState } from "react";

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
       alert("All fields required");
       return;
     }
 
     onSubmit(form);
   };
 
   return (
     <>
       <style>
         {`
           .auth-container {
             width: 300px;
             margin: 100px auto;
             padding: 20px;
             border: 1px solid #ddd;
             border-radius: 10px;
             text-align: center;
           }
 
           .auth-container h2 {
             margin-bottom: 20px;
           }
 
           .auth-container input {
             width: 100%;
             padding: 10px;
             margin: 10px 0;
             border: 1px solid #ccc;
             border-radius: 6px;
           }
 
           .auth-container button {
             width: 100%;
             padding: 10px;
             background-color: black;
             color: white;
             border: none;
             border-radius: 6px;
             cursor: pointer;
           }
 
           .auth-container button:hover {
             background-color: #333;
           }
         `}
       </style>
 
       <div className="auth-container">
         <h2>{type === "login" ? "Login" : "Register"}</h2>
 
         {type === "register" && (
           <input
             type="text"
             name="name"
             placeholder="Name"
             onChange={handleChange}
           />
         )}
 
         <input
           type="email"
           name="email"
           placeholder="Email"
           onChange={handleChange}
         />
 
         <input
           type="password"
           name="password"
           placeholder="Password"
           onChange={handleChange}
         />
 
         <button onClick={handleSubmit}>
           {type === "login" ? "Login" : "Register"}
         </button>
       </div>
     </>
   );
}

export default Login_Register_Form
