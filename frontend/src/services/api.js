import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ================= JWT INTERCEPTOR ================= */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= AUTH APIs ================= */

export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = (data) => API.post("/auth/login", data);

export const getMe = () => API.get("/auth/me");

export const forgotPassword = (data) => API.post("/auth/forgot-password", data);

export const resetPassword = (token, data) => API.put(`/auth/reset-password/${token}`, data);

export default API;