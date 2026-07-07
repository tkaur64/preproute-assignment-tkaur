import {
  Box,
  Button,
  MenuItem,
  Paper,
  Radio,
  FormControlLabel,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppBreadcrumbs from "../../components/AppBreadcrumbs/AppBreadcrumbs";
import FormField from "../../components/FormField/FormField";
import FormHelperText from "../../components/FieldError/FieldError";

import TestTypeSelector from "./components/TestTypeSelector";

import { ROUTES } from "../../constants/routes";
import { TEST_TYPE_OPTIONS } from "../../constants/test";


import type { Subject } from "../../types/subject";
import type { SubTopic } from "../../types/subTopic";
import type { Topic } from "../../types/topic";
import type { Difficulty, TestType } from "../../types/test";
import {
  createTest,
  // updateTest,
  getTestById,
  getSubjects,
  getSubTopics,
  getTopicsBySubject,
  updateTest,
} from "../../api/testApi";
import { selectMenuProps } from "./constants/select";
import { getDisplayValue } from "../../utils/select";
import { Controller, useForm } from "react-hook-form";
import { markingFields } from "./constants/markingFields";
import type { TestFormValues } from "../../types/testForm";
import { mapCreateTestPayload } from "../../mappers/testMapper";
import AppSnackbar from "../../components/AppSnackbar/AppSnackbar";
import { getErrorMessage } from "../../utils/error";
import type { SnackbarSeverity } from "../../types/snackbar";

const CreateTest = () => {
  const { id } = useParams();

  const isEditMode = Boolean(id);
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<TestFormValues>({
    defaultValues: {
      type: "chapterwise",

      subject: "",
      topic: "",
      subTopic: "",

      name: "",

      duration: "",

      difficulty: "easy",

      wrongMarks: "",
      unattemptedMarks: "",
      correctMarks: "",

      totalQuestions: "",
      totalMarks: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingSubTopics, setLoadingSubTopics] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [notification, setNotification] = useState({
    open: false,
    severity: "success" as SnackbarSeverity,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [formReady, setFormReady] = useState(!isEditMode);
  const selectedTestType = watch("type");


  const navigate = useNavigate();

  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      setNotification({
        open: true,
        severity: "error",
        message: getErrorMessage(error)
      })
    }
  };

  const fetchTest = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setFormReady(false);

      const response = await getTestById(id);

      const test = response.data;

      // Find Subject ID
      const selectedSubject = subjects.find(
        (subject) => subject.name === test.subject
      );

      let selectedTopic: Topic | undefined;
      let selectedSubTopic: SubTopic | undefined;

      if (selectedSubject) {
        const fetchedTopics = await fetchTopics(
          selectedSubject.id
        );

        selectedTopic = fetchedTopics.find(
          (topic) =>
            topic.name === test.topics?.[0]
        );

        if (selectedTopic) {
          const fetchedSubTopics =
            await fetchSubTopics(
              selectedTopic.id
            );

          selectedSubTopic =
            fetchedSubTopics.find(
              (subTopic) =>
                subTopic.name ===
                test.sub_topics?.[0]
            );
        }
      }

      setValue(
        "type",
        test.type as TestType
      );

      setValue(
        "subject",
        selectedSubject?.id ?? ""
      );

      setValue(
        "topic",
        selectedTopic?.id ?? ""
      );

      setValue(
        "subTopic",
        selectedSubTopic?.id ?? ""
      );

      setValue(
        "name",
        test.name
      );

      setValue(
        "duration",
        test.total_time ?? ""
      );

      setValue(
        "difficulty",
        test.difficulty as Difficulty
      );

      setValue(
        "wrongMarks",
        test.wrong_marks ?? ""
      );

      setValue(
        "unattemptedMarks",
        test.unattempt_marks ?? ""
      );

      setValue(
        "correctMarks",
        test.correct_marks ?? ""
      );

      setValue(
        "totalQuestions",
        test.total_questions ?? ""
      );

      setValue(
        "totalMarks",
        test.total_marks ?? ""
      );
      setFormReady(true);
    } catch (error) {
      setNotification({
        open: true,
        severity: "error",
        message: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!id || subjects.length === 0) return;

    fetchTest();
  }, [id, subjects]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchTopics = async (
    subjectId: string
  ): Promise<Topic[]> => {
    try {
      setLoadingTopics(true);

      const response = await getTopicsBySubject(subjectId);

      const fetchedTopics = response.data;

      setTopics(fetchedTopics);

      return fetchedTopics;
    } catch (error) {
      setNotification({
        open: true,
        severity: "error",
        message: getErrorMessage(error)
      })
      return [];
    } finally {
      setLoadingTopics(false);
    }
  };

  const fetchSubTopics = async (
    topicId: string
  ): Promise<SubTopic[]> => {
    try {
      setLoadingSubTopics(true);

      const response = await getSubTopics([topicId]);

      const fetchedSubTopics = response.data;

      setSubTopics(fetchedSubTopics);

      return fetchedSubTopics;
    } catch (error) {
      setNotification({
        open: true,
        severity: "error",
        message: getErrorMessage(error)
      })
      return [];
    } finally {
      setLoadingSubTopics(false);
    }
  };


  const onSubmit = async (data: TestFormValues) => {
    try {
      setIsSubmitting(true);
      const payload = mapCreateTestPayload(data);
      let response;

      if (isEditMode && id) {
        response = await updateTest(id, payload);
      } else {
        response = await createTest(payload);
      }
      setNotification({
        open: true,
        severity: "success",
        message: response.message,
      });
      const testId = response.data.id;
      if (id) {
        navigate(ROUTES.DASHBOARD)
      }
      else {
        navigate(
          ROUTES.ADD_QUESTIONS.replace(":id", testId)
        );
      }

    } catch (error) {
      setNotification({
        open: true,
        severity: "error",
        message: getErrorMessage(error),
      });

    }
    finally {
      setIsSubmitting(false);
    }

  };
  if (loading || !formReady) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (

    <Box>
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
            label: TEST_TYPE_OPTIONS.find((t) => t.value === selectedTestType)?.label ?? '',
          },
        ]}
      />

      <TestTypeSelector
        value={watch("type")}
        onChange={(value) => setValue("type", value)}
      />

      <Paper
        elevation={0}
        sx={{
          mt: 1,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        {/* Subject + Name */}
        <Grid
          container
          spacing={2}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Subject">
              <Controller
                name="subject"
                control={control}
                rules={{
                  required: "Subject is required",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    displayEmpty
                    MenuProps={selectMenuProps}
                    renderValue={(selected) =>
                      getDisplayValue(subjects, selected as string)
                    }
                    onChange={async (event) => {
                      field.onChange(event);

                      const subjectId = event.target.value as string;

                      // Reset dependent fields
                      setValue("topic", "");
                      setValue("subTopic", "");
                      setSubTopics([]);

                      clearErrors(["topic", "subTopic"]);

                      if (subjectId) {
                        await fetchTopics(subjectId);
                      }
                    }}
                  >{subjects.map((subject) => (
                    <MenuItem
                      key={subject.id}
                      value={subject.id}
                    >
                      {subject.name}
                    </MenuItem>
                  ))}</Select>
                )}
              />
            </FormField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Name of Test">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Test name is required",
                  maxLength: {
                    value: 100,
                    message: "Maximum 100 characters allowed",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter name of Test"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </FormField>
          </Grid>
        </Grid>

        {/* Topic + Sub Topic */}
        <Grid
          container
          spacing={3}
          sx={{ mt: 1 }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Topic">
              <Controller
                name="topic"
                control={control}
                rules={{
                  required: "Topic is required",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    displayEmpty
                    disabled={!watch("subject")}
                    MenuProps={selectMenuProps}
                    IconComponent={
                      loadingTopics
                        ? () => <CircularProgress size={18} />
                        : undefined
                    }
                    renderValue={(selected) =>
                      getDisplayValue(topics, selected as string)
                    }
                    onChange={async (event) => {
                      field.onChange(event);

                      const topicId = event.target.value as string;

                      setValue("subTopic", "");

                      clearErrors("subTopic");

                      if (topicId) {
                        await fetchSubTopics(topicId);
                      }
                    }}
                  >{topics.map((topic) => (
                    <MenuItem
                      key={topic.id}
                      value={topic.id}
                    >
                      {topic.name}
                    </MenuItem>
                  ))}</Select>
                )}
              />
            </FormField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Sub Topic">
              <Controller
                name="subTopic"
                control={control}
                rules={{
                  required: "Sub Topic is required",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    displayEmpty
                    disabled={!watch("topic")}
                    MenuProps={selectMenuProps}
                    IconComponent={loadingSubTopics ? () => <CircularProgress size={18} /> : undefined}
                    renderValue={(selected) =>
                      getDisplayValue(subTopics, selected as string)
                    }
                  >
                    {subTopics.map((subTopic) => (
                      <MenuItem
                        key={subTopic.id}
                        value={subTopic.id}
                      >
                        {subTopic.name}
                      </MenuItem>
                    ))}
                    {errors.subTopic && (
                      <FormHelperText
                        error={errors.subTopic?.message}
                      />
                    )}
                  </Select>
                )}
              />
            </FormField>
          </Grid>
        </Grid>

        {/* Duration + Difficulty */}
        <Grid
          container
          spacing={3}
          sx={{ mt: 1 }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Duration (Minutes)">
              <Controller
                name="duration"
                control={control}
                rules={{
                  required: "Duration is required",
                  min: {
                    value: 1,
                    message: "Duration should be greater than 0",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    error={!!errors.duration}
                    helperText={errors.duration?.message}
                  />
                )}
              />
            </FormField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Test Difficulty Level">
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    sx={{
                      height: 56,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      value="easy"
                      control={<Radio />}
                      label="Easy"
                    />

                    <FormControlLabel
                      value="medium"
                      control={<Radio />}
                      label="Medium"
                    />

                    <FormControlLabel
                      value="difficult"
                      control={<Radio />}
                      label="Difficult"
                    />
                  </RadioGroup>
                )}
              />
            </FormField>
          </Grid>
        </Grid>

        {/* Marking Scheme */}
        <Typography
          sx={{
            mt: 5,
            mb: 2,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Marking Scheme
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {markingFields.map((field) => (
            <FormField label={field.label}>
              <Controller
                name={field.name}
                rules={field.rules}
                control={control}
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    type="number"
                    placeholder={field.placeholder}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                  />
                )}
              />
            </FormField>
          ))}
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="text"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "primary.main",
              bgcolor: "primary.light",

              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              bgcolor: "primary.main",
              color: "#FFFFFF",
              boxShadow: "none",

              "&:hover": {
                bgcolor: "primary.main",
                boxShadow: "none",
              },
            }}
          >
            {isEditMode ? "Submit" : "Next"}
          </Button>
        </Box>
      </Paper>
      <AppSnackbar
        open={notification.open}
        severity={notification.severity}
        message={notification.message}
        onClose={handleCloseNotification}
      />
    </Box>
  );
};

export default CreateTest;