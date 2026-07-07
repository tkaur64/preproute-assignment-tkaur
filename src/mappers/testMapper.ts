import type { CreateTestRequest } from "../types/createTest";
import type { TestFormValues } from "../types/testForm";

export const mapCreateTestPayload = (data: TestFormValues) => ({
  name: data.name,
  type: data.type,
  subject: data.subject,

  topics: [data.topic],
  sub_topics: [data.subTopic],

  correct_marks: Number(data.correctMarks),
  wrong_marks: Number(data.wrongMarks),
  unattempt_marks: Number(data.unattemptedMarks),

  difficulty: data.difficulty,

  total_time: Number(data.duration),
  total_marks: Number(data.totalMarks),
  total_questions: Number(data.totalQuestions),

  status: "draft" satisfies CreateTestRequest["status"],
});
