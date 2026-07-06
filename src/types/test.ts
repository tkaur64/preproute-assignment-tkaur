export interface Test {
  id: string;
  name: string;
  type: string;
  subject: string;
  topics: string[];
  sub_topics: string[];
  questions: unknown[] | null;
  correct_marks: number;
  unattempt_marks: number;
  wrong_marks: number;
  difficulty: string;
  total_marks: number;
  total_time: number;
  total_questions: number;
  status: "draft" | "published";
  created_at: string;
  updated_at: string | null;
}
export interface GetTestsResponse {
  success: boolean;
  data: Test[];
}

export type TestType = "chapterwise" | "pyq" | "mock";

export type Difficulty = "easy" | "medium" | "difficult";

export interface GetTestByIdResponse {
  success: boolean;
  data: Test;
}
