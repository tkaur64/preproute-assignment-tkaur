import type {
  BulkCreateQuestionsRequest,
  BulkCreateQuestionsResponse,
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
