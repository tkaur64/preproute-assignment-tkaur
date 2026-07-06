import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getSubjects, getSubTopics, getTopicsBySubject } from "../../../../api/testApi";


import type { SubTopic } from "../../../../types/subTopic";
import type { Test } from "../../../../types/test";
import type { Topic } from "../../../../types/topic";

import OptionsSection from "./OptionsSection";
import QuestionEditor from "./QuestionEditor";
import QuestionSettings from "./QuestionSettings";
import SolutionSection from "./SolutionSection";
import type { Subject } from "../../../../types/subject";

export interface QuestionFormValues {
  question: string;

  option1: string;
  option2: string;
  option3: string;
  option4: string;

  correctOption:
  | "option1"
  | "option2"
  | "option3"
  | "option4";

  explanation: string;

  difficulty: string;

  topic: string;

  subTopic: string;

  mediaUrl: string;
}

const defaultValues: QuestionFormValues = {
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctOption: "option1",
  explanation: "",
  difficulty: "easy",
  topic: "",
  subTopic: "",
  mediaUrl: "",
};

interface QuestionFormProps {
  test: Test;

  questions: QuestionFormValues[];
  setQuestions: React.Dispatch<
    React.SetStateAction<QuestionFormValues[]>
  >;

  selectedQuestion: number;
  setSelectedQuestion: React.Dispatch<
    React.SetStateAction<number>
  >;
}

const QuestionForm = ({
  test,
  questions,
  setQuestions,
  selectedQuestion,
  setSelectedQuestion,
}: QuestionFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    defaultValues,
  });

  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const selectedTopic = watch("topic");

  useEffect(() => {
    const question =
      questions[selectedQuestion - 1];

    if (question) {
      reset(question);
    } else {
      reset(defaultValues);
    }
  }, [selectedQuestion, questions, reset]);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();

      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchTopics = async (id: string) => {
    try {

      const response = await getTopicsBySubject(id);
      setTopics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubTopics = async (
    topicId: string
  ) => {
    try {
      const response = await getSubTopics([
        topicId,
      ]);

      setSubTopics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const subject = subjects.find(
      (subject) => subject.name === test.subject
    );

    if (!subject) {
      return;
    }

    fetchTopics(subject.id);
  }, [subjects, test.subject]);

  useEffect(() => {
    if (!selectedTopic) {
      setSubTopics([]);
      return;
    }

    setValue("subTopic", "");
    clearErrors("subTopic");

    fetchSubTopics(selectedTopic);
  }, [selectedTopic]);

  const handleAddQuestion = (
    data: QuestionFormValues
  ) => {
    const updatedQuestions = [...questions];

    updatedQuestions[selectedQuestion - 1] =
      data;

    setQuestions(updatedQuestions);

    if (
      selectedQuestion <
      test.total_questions
    ) {
      setSelectedQuestion((prev) => prev + 1);
    }

    reset(defaultValues);
  };

  const handleSaveAndContinue = () => {
    console.log(questions);

    // TODO
    // POST /questions/bulk
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <QuestionEditor
        control={control}
        errors={errors}
      />

      <OptionsSection
        control={control}
        errors={errors}
      />

      <SolutionSection
        control={control}
        errors={errors}
      />

      <QuestionSettings
        control={control}
        errors={errors}
        topics={topics}
        subTopics={subTopics}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => reset(defaultValues)}
        >
          Cancel
        </Button>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleSubmit(
              handleAddQuestion
            )}
          >
            {questions[selectedQuestion - 1]
              ? "Update Question"
              : "Add Another Question"}
          </Button>

          <Button
            variant="contained"
            disabled={questions.length === 0}
            onClick={
              handleSaveAndContinue
            }
          >
            Save & Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionForm;