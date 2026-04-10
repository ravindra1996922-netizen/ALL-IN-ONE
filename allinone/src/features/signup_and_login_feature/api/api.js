import { buildURL } from "../../../utils/api/api_builder";
import { END_POINTS } from "./endpointsConstant";

export async function registerUser(userData) {
  try {
    const register = END_POINTS.register;
    const response = await fetch(buildURL(register), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUser(credentials) {
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
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}
