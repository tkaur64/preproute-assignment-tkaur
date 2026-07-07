import type { TestType } from "./test";

export interface TestFormValues {
  type: TestType;

  subject: string;
  topic: string;
  subTopic: string;

  name: string;

  duration: number | "";

  difficulty: "easy" | "medium" | "hard";

  wrongMarks: number | "";
  unattemptedMarks: number | "";
  correctMarks: number | "";

  totalQuestions: number | "";
  totalMarks: number | "";
}
