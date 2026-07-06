import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppBreadcrumbs from "../../components/AppBreadcrumbs/AppBreadcrumbs";
import DashboardHeader from "../Dashboard/components/DashboardHeader";

import QuestionSidebar from "./components/QuestionSidebar";
import TestOverviewCard from "../../components/TestOverviewCard/TestOverviewCard";
import QuestionForm from "./components/QuestionForm";

import { ROUTES } from "../../constants/routes";
import { getTestById } from "../../api/testApi";
import { getErrorMessage } from "../../utils/error";
import type { Test } from "../../types/test";

const AddQuestions = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [test, setTest] = useState<Test | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTest = async () => {
    if (!id) {
      return;
    }

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
        height: "100%",
        minHeight: 0,
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
            label: test.name,
          },
        ]}
      />

      <DashboardHeader
        title=""
        buttonText="Publish"
        onButtonClick={() => { }}
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
        <QuestionSidebar />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TestOverviewCard test={test} />

          <QuestionForm />
        </Box>
      </Box>
    </Box>
  );
};

export default AddQuestions;