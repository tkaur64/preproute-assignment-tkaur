import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchBulkQuestions } from "../../api/questionApi";
import {
  getTestById,
  publishTest,
} from "../../api/testApi";

import AppBreadcrumbs from "../../components/AppBreadcrumbs/AppBreadcrumbs";
import AppSnackbar from "../../components/AppSnackbar/AppSnackbar";
import TestOverviewCard from "../../components/TestOverviewCard/TestOverviewCard";

import { ROUTES } from "../../constants/routes";

import { getErrorMessage } from "../../utils/error";

import type { Question } from "../../types/question";
import type { Test } from "../../types/test";

import QuestionSidebar from "../AddQuestions/components/QuestionSidebar";
import type {
  LiveUntil,
  PublishMode
} from "./components/PublishSettings"
import PublishSettings from "./components/PublishSettings";
import QuestionPreview from "./components/QuestionPreview";

const PreviewAndPublish = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] =
    useState(false);

  const [error, setError] = useState("");

  const [test, setTest] = useState<Test | null>(
    null
  );

  const [questions, setQuestions] = useState<
    Question[]
  >([]);

  const [selectedQuestion, setSelectedQuestion] =
    useState(1);

  const [publishMode, setPublishMode] =
    useState<PublishMode>("publishNow");

  const [publishDate, setPublishDate] =
    useState("");

  const [publishTime, setPublishTime] =
    useState("");

  const [liveUntil, setLiveUntil] =
    useState<LiveUntil>("always");

  const [endDate, setEndDate] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const [notification, setNotification] =
    useState({
      open: false,
      message: "",
      severity: "success" as
        | "success"
        | "error"
        | "warning"
        | "info",
    });

  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const fetchData = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const testResponse = await getTestById(id);

      setTest(testResponse.data);

      if (
        testResponse.data.questions &&
        testResponse.data.questions.length > 0
      ) {
        const questionResponse =
          await fetchBulkQuestions({
            question_ids:
              testResponse.data.questions as string[],
          });

        setQuestions(questionResponse.data);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handlePublish = async () => {
    if (!test) return;

    if (questions.length === 0) {
      setNotification({
        open: true,
        message:
          "Please add at least one question before publishing.",
        severity: "warning",
      });

      return;
    }

    try {
      setPublishing(true);

      await publishTest(test.id);

      setNotification({
        open: true,
        message:
          "Test published successfully.",
        severity: "success",
      });

      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 1200);
    } catch (error) {
      setNotification({
        open: true,
        message: getErrorMessage(error),
        severity: "error",
      });
    } finally {
      setPublishing(false);
    }
  };

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
    <Box sx={{ p: 3 }}>
      <AppBreadcrumbs
        items={[
          {
            label: "Test Creation",
            onClick: () =>
              navigate(ROUTES.DASHBOARD),
          },
          {
            label: "Preview & Publish",
          },
        ]}
      />

      <Box
        sx={{
          mt: 3,
        }}
      >
        <TestOverviewCard
          test={test}
          showEditButton
          onEdit={() =>
            navigate(
              `${ROUTES.CREATE_TEST}/${test.id}`
            )
          }
        />
      </Box>

      <Box
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 3,
          alignItems: "start",
        }}
      >
        <QuestionSidebar
          totalQuestions={questions.length}
          selectedQuestion={
            selectedQuestion
          }
          completedQuestions={[]}
          onQuestionSelect={
            setSelectedQuestion
          }
        />

        <QuestionPreview
          question={
            questions[
            selectedQuestion - 1
            ] ?? null
          }
        />
      </Box>

      <Box
        sx={{
          mt: 3,
        }}
      >
        <PublishSettings
          publishMode={publishMode}
          onPublishModeChange={
            setPublishMode
          }
          publishDate={publishDate}
          onPublishDateChange={
            setPublishDate
          }
          publishTime={publishTime}
          onPublishTimeChange={
            setPublishTime
          }
          liveUntil={liveUntil}
          onLiveUntilChange={
            setLiveUntil
          }
          endDate={endDate}
          onEndDateChange={
            setEndDate
          }
          endTime={endTime}
          onEndTimeChange={
            setEndTime
          }
        />
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 3,
          justifyContent: "flex-end"
        }}
      >
        <Button
          variant="outlined"
          onClick={() =>
            navigate(
              `${ROUTES.ADD_QUESTIONS}/${test.id}`
            )
          }
        >
          Edit Questions
        </Button>

        <Button
          variant="outlined"
          onClick={() =>
            navigate(
              `${ROUTES.CREATE_TEST}/${test.id}`
            )
          }
        >
          Edit Test
        </Button>

        <Button
          variant="contained"
          onClick={handlePublish}
          disabled={publishing}
        >
          {publishing
            ? "Publishing..."
            : "Publish Test"}
        </Button>
      </Stack>

      <AppSnackbar
        open={notification.open}
        severity={notification.severity}
        message={notification.message}
        onClose={
          handleCloseNotification
        }
      />
    </Box>
  );
};

export default PreviewAndPublish;