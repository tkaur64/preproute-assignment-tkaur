import apiClient from "./axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", data);

  return response.data;
};
