import { Typography } from "@mui/material";

interface FormLabelProps {
  children: React.ReactNode;
}

const FormLabel = ({ children }: FormLabelProps) => (
  <Typography
    variant="body2"
    sx={{
      fontWeight: 500,
      color: "text.primary",
    }}
  >
    {children}
  </Typography>
);

export default FormLabel;