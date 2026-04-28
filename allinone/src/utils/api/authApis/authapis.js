import { toast } from "react-toastify";
import { END_POINTS } from "../../constant/constant";
import { buildURL } from "../apibuilder/api_builder";

export async function registerUser(userData) {
  console.log(userData, "ud");
  try {
    const register = END_POINTS.register;
    const response = await fetch(buildURL(register), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("user already exist");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    toast.error(`Invalid credentials :${error.message}`, {
      style: {
        background: "red",
        color: "black",
      },
    });
    throw error;
  }
}

export async function loginUser(credentials) {
  console.log(credentials);
  try {
    const login = END_POINTS.login;
    const response = await fetch(buildURL(login), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Server Error:", errorText);
      toast.error(`Invalid credentials :${errorText}`, {
        style: {
          background: "red",
          color: "black",
        },
      });
    }

    const data = await response.json();
    console.log(data, "login data");
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}
