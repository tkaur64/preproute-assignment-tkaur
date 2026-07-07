import type {
  BulkCreateQuestionsRequest,
  BulkCreateQuestionsResponse,
  FetchBulkQuestionsRequest,
  FetchBulkQuestionsResponse,
} from "../types/question";
import apiClient from "./axios";

export const createQuestions = async (
  payload: BulkCreateQuestionsRequest,
): Promise<BulkCreateQuestionsResponse> => {
  const response = await apiClient.post<BulkCreateQuestionsResponse>(
    "/questions/bulk",
    payload,
  );

  return response.data;
};

export const fetchBulkQuestions = async (
  request: FetchBulkQuestionsRequest,
): Promise<FetchBulkQuestionsResponse> => {
  const response = await apiClient.post<FetchBulkQuestionsResponse>(
    "/questions/fetchBulk",
    request,
  );

  return response.data;
};
