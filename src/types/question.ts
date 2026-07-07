export interface CreateQuestionRequest {
  type: "mcq";
  question: string;

  option1: string;
  option2: string;
  option3: string;
  option4: string;

  correct_option: "option1" | "option2" | "option3" | "option4";

  explanation?: string;

  difficulty?: string;

  test_id: string;
  subject: string;
}

export interface BulkCreateQuestionsRequest {
  questions: CreateQuestionRequest[];
}

export interface Question {
  id: string;
}

export interface BulkCreateQuestionsResponse {
  success: boolean;
  data: Question[];
  message: string;
}

export interface FetchBulkQuestionsRequest {
  question_ids: string[];
}

export interface Question {
  id: string;
  type: "mcq";

  subject: string;

  question: string;

  option1: string;
  option2: string;
  option3: string;
  option4: string;

  correct_option: "option1" | "option2" | "option3" | "option4";

  explanation: string;

  difficulty: "easy" | "medium" | "hard";

  test_id: string;

  created_by: number;
  created_at: string;

  updated_by: number | null;
  updated_at: string | null;
}

export interface FetchBulkQuestionsResponse {
  status: "success" | "error";
  message: string;
  data: Question[];
}
