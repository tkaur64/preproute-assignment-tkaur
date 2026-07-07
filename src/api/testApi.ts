import apiClient from "./axios";
import type { GetTestByIdResponse, GetTestsResponse } from "../types/test";
import type { GetSubjectsResponse } from "../types/subject";

import type { GetTopicsResponse } from "../types/topic";

import type { GetSubTopicsResponse } from "../types/subTopic";
import type {
  CreateTestRequest,
  CreateTestResponse,
} from "../types/createTest";

export const getAllTests = async (): Promise<GetTestsResponse> => {
  const response = await apiClient.get<GetTestsResponse>("/tests");

  return response.data;
};

export const getSubjects = async (): Promise<GetSubjectsResponse> => {
  const response = await apiClient.get<GetSubjectsResponse>("/subjects");

  return response.data;
};

export const getTopicsBySubject = async (
  subjectId: string,
): Promise<GetTopicsResponse> => {
  const response = await apiClient.get<GetTopicsResponse>(
    `/topics/subject/${subjectId}`,
  );

  return response.data;
};

export const getSubTopics = async (
  topicIds: string[],
): Promise<GetSubTopicsResponse> => {
  const response = await apiClient.post<GetSubTopicsResponse>(
    "/sub-topics/multi-topics",
    {
      topicIds,
    },
  );

  return response.data;
};

export const createTest = async (
  payload: CreateTestRequest,
): Promise<CreateTestResponse> => {
  const response = await apiClient.post<CreateTestResponse>("/tests", payload);

  return response.data;
};

export const getTestById = async (
  testId: string,
): Promise<GetTestByIdResponse> => {
  const response = await apiClient.get<GetTestByIdResponse>(`/tests/${testId}`);

  return response.data;
};

export const publishTest = async (id: string) => {
  const response = await apiClient.put(`/tests/${id}`, {
    status: "live",
  });

  return response.data;
};

export const updateTest = async (id: string, payload: CreateTestRequest) => {
  const response = await apiClient.put(`/tests/${id}`, payload);

  return response.data;
};
