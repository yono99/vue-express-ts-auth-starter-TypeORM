import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/user",
  withCredentials: true,
});

export const getProfile = () => api.get("/profile");

export const updateProfile = (data: {
  name: string;
  email: string;
  unit: string;
}) => api.put("/profile", data);

export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
}) => api.put("/change-password", data);