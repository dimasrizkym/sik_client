import apiClient from "@/api/axios";
import type { LoginValues, RegisterValues } from "@/validations/schemas";

export const login = (credentials: LoginValues) => {
  return apiClient.post("/auth/login", credentials);
};

export const register = (data: RegisterValues) => {
  return apiClient.post("/auth/register", data);
};

export const getProfile = () => {
  return apiClient.get("/auth/profile");
};
