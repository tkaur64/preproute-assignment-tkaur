import type { Difficulty, TestType } from "./test";

export interface CreateTestRequest {
  name: string;
  type: TestType;
  subject: string;

  topics: string[];
  sub_topics: string[];

  correct_marks: number;
  wrong_marks: number;
  unattempt_marks: number;

  difficulty: Difficulty;

  total_time: number;
  total_marks: number;
  total_questions: number;

  status: "draft" | "live" | "unpublished" | "scheduled" | "expired";
}

export interface CreateTestResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    type: TestType;
    subject: string;

    topics: string[];
    sub_topics: string[];

    correct_marks: number;
    wrong_marks: number;
    unattempt_marks: number;

    difficulty: Difficulty;

    total_time: number;
    total_marks: number;
    total_questions: number;

    status: string | null;

    created_at: string;
    updated_at: string;
  };
  message: string;
}
