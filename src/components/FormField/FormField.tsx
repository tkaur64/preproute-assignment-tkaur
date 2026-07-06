import { Box } from "@mui/material";
import type { ReactNode } from "react";
import FormLabel from "../FormLabel/FormLabel";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <FormLabel>{label}</FormLabel>
      {children}
    </Box>
  );
};

export default FormField;