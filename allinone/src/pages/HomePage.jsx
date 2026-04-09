import React from "react";
import { useAuth } from "../context/authContext/useAuth";

const HomePage = () => {
  const { user, authDispatch } = useAuth();
  const handleLogout = () => authDispatch({ type: "LOGOUT" });
  const goToLogin = () => authDispatch({ type: "SET_PAGE", payload: "login" });
  const goToRegister = () =>
    authDispatch({ type: "SET_PAGE", payload: "register" });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome {user ? user.name || user.email : "Guest"}</h1>

      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button onClick={goToLogin}>Login</button>
          <button onClick={goToRegister}>Register</button>
        </>
      )}
    </div>
  );
};
export default HomePage;
