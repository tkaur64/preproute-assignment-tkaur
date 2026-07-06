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
