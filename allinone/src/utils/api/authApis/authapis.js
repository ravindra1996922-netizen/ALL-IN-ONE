import { END_POINTS } from "../../constant/constant";
import { buildURL } from "../apibuilder/api_builder";

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
const BASE_URL = "http://localhost:3000";

// GET
export async function getPortfolio(userId) {
  const res = await fetch(`${BASE_URL}/portfolios?userId=${userId}`);
  const data = await res.json();
  return data[0];
}

// POST
export async function createPortfolio(payload) {
  const res = await fetch(`${BASE_URL}/portfolios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}

// PUT
export async function updatePortfolio(id, payload) {
  const res = await fetch(`${BASE_URL}/portfolios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}
