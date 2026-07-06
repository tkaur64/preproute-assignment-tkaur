import type {
  BulkCreateQuestionsRequest,
  CreateQuestionRequest,
} from "../types/question";
import type { QuestionFormValues } from "../pages/AddQuestions/components/QuestionForm/QuestionForm";
import type { Test } from "../types/test";

export const mapQuestionsToBulkCreateRequest = (
  questions: QuestionFormValues[],
  test: Test,
): BulkCreateQuestionsRequest => ({
  questions: questions.map<CreateQuestionRequest>((question) => ({
    type: "mcq",
    question: question.question,

    option1: question.option1,
    option2: question.option2,
    option3: question.option3,
    option4: question.option4,

    correct_option: question.correctOption,

    explanation: question.explanation,
    difficulty: question.difficulty,

    test_id: test.id,
    subject: test.subject,
  })),
});
