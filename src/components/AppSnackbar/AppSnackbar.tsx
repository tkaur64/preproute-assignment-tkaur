import { Alert, Snackbar } from "@mui/material";
import type { SnackbarSeverity } from "../../types/snackbar";

interface AppSnackbarProps {
  open: boolean;
  severity: SnackbarSeverity;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
}

const AppSnackbar = ({
  open,
  severity,
  message,
  onClose,
  autoHideDuration = 4000,
}: AppSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;