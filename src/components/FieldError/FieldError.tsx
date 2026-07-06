import MuiFormHelperText from "@mui/material/FormHelperText";

interface FieldErrorProps {
  error?: string;
}

const FieldError = ({ error }: FieldErrorProps) => {
  if (!error) {
    return null;
  }

  return (
    <MuiFormHelperText
      error
      sx={{
        mt: 0.5,
        ml: 0,
        fontSize: 12,
        lineHeight: "16px",
      }}
    >
      {error}
    </MuiFormHelperText>
  );
};

export default FieldError;