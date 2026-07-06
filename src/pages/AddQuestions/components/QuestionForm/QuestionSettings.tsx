import { MenuItem, Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

import FormField from "../../../../components/FormField/FormField";

import type { Topic } from "../../../../types/topic";
import type { SubTopic } from "../../../../types/subTopic";
import type { QuestionFormValues } from "./QuestionForm";

interface QuestionSettingsProps {
  control: Control<QuestionFormValues>;
  errors: FieldErrors<QuestionFormValues>;
  topics: Topic[];
  subTopics: SubTopic[];
}

const difficultyOptions = [
  {
    label: "Easy",
    value: "easy",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Difficult",
    value: "difficult",
  },
];

const QuestionSettings = ({
  control,
  errors,
  topics,
  subTopics,
}: QuestionSettingsProps) => {
  return (
    <Stack spacing={3}>
      <FormField label="Question Settings">
        <Stack
          direction="column"
          spacing={2}
        >
          <FormField
            label="Level of Difficulty"
          >
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  error={!!errors.difficulty}
                  helperText={errors.difficulty?.message}
                >
                  {difficultyOptions.map((difficulty) => (
                    <MenuItem
                      key={difficulty.value}
                      value={difficulty.value}
                    >
                      {difficulty.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </FormField>

          <FormField
            label="Topic"
          >
            <Controller
              name="topic"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  error={!!errors.topic}
                  helperText={errors.topic?.message}
                >
                  <MenuItem value="">
                    Select Topic
                  </MenuItem>

                  {topics.map((topic) => (
                    <MenuItem
                      key={topic.id}
                      value={topic.id}
                    >
                      {topic.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </FormField>

          <FormField
            label="Sub Topic"

          >
            <Controller
              name="subTopic"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  error={!!errors.subTopic}
                  helperText={errors.subTopic?.message}
                >
                  <MenuItem value="">
                    Select Sub Topic
                  </MenuItem>

                  {subTopics.map((subTopic) => (
                    <MenuItem
                      key={subTopic.id}
                      value={subTopic.id}
                    >
                      {subTopic.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </FormField>

          <FormField
            label="Media URL"
            sx={{ flex: 1 }}
          >
            <Controller
              name="mediaUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="https://example.com/image.png"
                  error={!!errors.mediaUrl}
                  helperText={errors.mediaUrl?.message}
                />
              )}
            />
          </FormField>
        </Stack>
      </FormField>
    </Stack>
  );
};

export default QuestionSettings;