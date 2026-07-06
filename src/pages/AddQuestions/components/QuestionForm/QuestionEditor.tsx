import "quill/dist/quill.snow.css";

import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

import ReactQuill from "react-quill-new";
import { Box, FormHelperText } from "@mui/material";

import FormField from "../../../../components/FormField/FormField";

import type { QuestionFormValues } from "./QuestionForm";

interface QuestionEditorProps {
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

const QuestionEditor = ({
  control,
  errors,
}: QuestionEditorProps) => {
  return (
    <FormField label="Question">
      <Controller
        name="question"
        control={control}
        rules={{
          required: "Question is required",
        }}
        render={({ field }) => (
          <>
            <Box
              sx={{
                "& .ql-toolbar": {
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                },
                "& .ql-container": {
                  minHeight: 220,
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
                placeholder="Type your question..."
              />
            </Box>

            {errors.question && (
              <FormHelperText error>
                {errors.question.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormField>
  );
};

export default QuestionEditor;