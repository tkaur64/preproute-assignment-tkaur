import "quill/dist/quill.snow.css";

import { Box, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import type { Control, FieldErrors } from "react-hook-form";

import FormField from "../../../../components/FormField/FormField";

import type { QuestionFormValues } from "./QuestionForm";

interface SolutionSectionProps {
  control: Control<QuestionFormValues>;
  errors: FieldErrors<QuestionFormValues>;
}

const toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image"],
  ["clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

const SolutionSection = ({
  control,
  errors,
}: SolutionSectionProps) => {
  return (
    <FormField label="Add Solution">
      <Controller
        name="explanation"
        control={control}
        render={({ field }) => (
          <>
            <Box
              sx={{
                "& .ql-toolbar": {
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                },
                "& .ql-container": {
                  minHeight: 180,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                },
              }}
            >
              <ReactQuill
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={modules}
                placeholder="Type the solution (Optional)..."
              />
            </Box>

            {errors.explanation && (
              <FormHelperText error>
                {errors.explanation.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormField>
  );
};

export default SolutionSection;