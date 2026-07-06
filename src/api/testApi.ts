import apiClient from "./axios";
import type { GetTestsResponse } from "../types/test";

export const getAllTests = async (): Promise<GetTestsResponse> => {
  const response = await apiClient.get<GetTestsResponse>("/tests");

  return response.data;
};
