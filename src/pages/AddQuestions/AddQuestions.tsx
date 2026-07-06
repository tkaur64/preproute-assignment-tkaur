import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTestById } from "../../api/testApi";
import AppBreadcrumbs from "../../components/AppBreadcrumbs/AppBreadcrumbs";
import TestOverviewCard from "../../components/TestOverviewCard/TestOverviewCard";
import { ROUTES } from "../../constants/routes";
import { TEST_TYPE_OPTIONS } from "../../constants/test";
import { getErrorMessage } from "../../utils/error";

import type { Test } from "../../types/test";
import type { QuestionFormValues } from "./components/QuestionForm/QuestionForm";

import QuestionForm from "./components/QuestionForm/QuestionForm";
import QuestionSidebar from "./components/QuestionSidebar";

const AddQuestions = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [test, setTest] = useState<Test | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [questions, setQuestions] = useState<QuestionFormValues[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  const completedQuestions = questions.map((_, index) => index + 1);

  const fetchTest = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const response = await getTestById(id);

      setTest(response.data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTest();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }

  if (!test) {
    return (
      <Typography>
        Test not found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        height: "100%",
      }}
    >
      <AppBreadcrumbs
        items={[
          {
            label: "Test Creation",
            onClick: () => navigate(ROUTES.DASHBOARD),
          },
          {
            label: "Create Test",
          },
          {
            label: TEST_TYPE_OPTIONS.find((o) => o.value === test.type)?.label ?? '',
          },
        ]}
      />

      <TestOverviewCard
        test={test}
        showEditButton
        onEdit={() =>
          navigate(`${ROUTES.CREATE_TEST}/${test.id}`)
        }
      />

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <QuestionSidebar
          totalQuestions={test.total_questions}
          selectedQuestion={selectedQuestion}
          completedQuestions={completedQuestions}
          onQuestionSelect={setSelectedQuestion}
        />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: 1,
          }}
        >
          <QuestionForm
            test={test}
            questions={questions}
            setQuestions={setQuestions}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddQuestions;