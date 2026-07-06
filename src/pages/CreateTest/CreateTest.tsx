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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBreadcrumbs from "../../components/AppBreadcrumbs/AppBreadcrumbs";
import FormField from "../../components/FormField/FormField";
import FormHelperText from "../../components/FieldError/FieldError";

import TestTypeSelector from "./components/TestTypeSelector";

import { ROUTES } from "../../constants/routes";
import { TEST_TYPE_OPTIONS } from "../../constants/test";


import type { Subject } from "../../types/subject";
import type { SubTopic } from "../../types/subTopic";
import type { Topic } from "../../types/topic";
import { getSubjects, getSubTopics, getTopicsBySubject } from "../../api/testApi";
import { selectMenuProps } from "./constants/select";
import { getDisplayValue } from "../../utils/select";
import { Controller, useForm } from "react-hook-form";
import { markingFields } from "./constants/markingFields";
import type { TestFormValues } from "../../types/testForm";

const CreateTest = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
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

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);

  const selectedTestType = watch("type");
  const selectedSubject = watch("subject");
  const selectedTopic = watch("topic");
  const selectedSubTopic = watch("subTopic");

  const navigate = useNavigate();



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

  const fetchTopics = async (subjectId: string) => {
    try {
      const response = await getTopicsBySubject(subjectId);

      setTopics(response.data);


      setValue("topic", "");
      setValue("subTopic", "");
      setSubTopics([]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!selectedSubject) return;

    fetchTopics(selectedSubject);
  }, [selectedSubject]);

  const fetchSubTopics = async (topicId: string) => {
    try {
      const response = await getSubTopics([topicId]);

      setSubTopics(response.data);
      setValue("subTopic", "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedTopic) return;

    fetchSubTopics(selectedTopic);
  }, [selectedTopic]);

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
                  >
                    {subjects.map((subject) => (
                      <MenuItem
                        key={subject.id}
                        value={subject.id}
                      >
                        {subject.name}
                      </MenuItem>
                    ))}
                    {errors.subject && (
                      <FormHelperText
                        error={errors.subject?.message}
                      />
                    )}
                  </Select>
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
                    MenuProps={selectMenuProps}
                    renderValue={(selected) =>
                      getDisplayValue(topics, selected as string)
                    }
                  >
                    {topics.map((topic) => (
                      <MenuItem
                        key={topic.id}
                        value={topic.id}
                      >
                        {topic.name}
                      </MenuItem>
                    ))}
                    {errors.topic && (
                      <FormHelperText
                        error={errors.topic?.message}
                      />
                    )}
                  </Select>
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
                  required: "Topic is required",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    displayEmpty
                    MenuProps={selectMenuProps}
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
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateTest;