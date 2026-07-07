import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  IconButton,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

import FormField from "../../../../components/FormField/FormField";

import type { QuestionFormValues } from "./QuestionForm";

interface OptionsSectionProps {
  control: Control<QuestionFormValues>;
  errors: FieldErrors<QuestionFormValues>;
}

const OPTIONS = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
  {
    label: "Option 3",
    value: "option3",
  },
  {
    label: "Option 4",
    value: "option4",
  },
] as const;

const OptionsSection = ({
  control,
  errors,
}: OptionsSectionProps) => {
  return (
    <FormField label="Type the options below">
      <Stack spacing={2}>
        {OPTIONS.map((option) => (
          <Stack
            key={option.value}
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <Controller
              name="correctOption"
              control={control}
              render={({ field }) => (
                <Radio
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                />
              )}
            />

            <Controller
              name={option.value}
              control={control}
              rules={{
                required: `${option.label} is required`,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder={option.label}
                  error={!!errors[option.value]}
                  helperText={errors[option.value]?.message}
                />
              )}
            />

            <Box>
              <IconButton
                disabled
                size="small"
              >
                <DeleteOutlineOutlinedIcon
                  fontSize="small"
                />
              </IconButton>
            </Box>
          </Stack>
        ))}
      </Stack>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          mt: 1,
          display: "block",
        }}
      >
        Select the radio button corresponding to the correct answer.
      </Typography>
    </FormField>
  );
};

export default OptionsSection;