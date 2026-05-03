import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // ← wajib untuk session cookie
});

export const login = (email: string, password: string) =>
  api.post("/login", { email, password });

export const logout = () =>
  api.post("/logout");

export const getMe = () =>
  api.get("/me");

export const register = (data: {
  name: string;
  email: string;
  password: string;
  role: string;
  unit: string;
}) => api.post("/register", data);