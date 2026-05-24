import axios from "axios";

// 🔥 Base URL from env, fallback to localhost
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // 🔥 Required for cookies (accessToken, refreshToken) to be sent/received
});

// 🔥 Attach token from localStorage to every request as Bearer header
// This ensures auth works even if cookie is not yet set (e.g. first login)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= AUTH API CALLS =================

export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = (data) => API.post("/auth/login", data);

export const logoutUser = () => API.post("/auth/logout");

export const refreshToken = () => API.post("/auth/refresh");

export default API;