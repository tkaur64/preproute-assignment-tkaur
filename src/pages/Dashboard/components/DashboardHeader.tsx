import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface DashboardHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

const DashboardHeader = ({
  title,
  buttonText,
  onButtonClick,
}: DashboardHeaderProps) => {
  return (
    <Stack
      spacing={2}
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        justifyContent: "space-between",
        alignItems: {
          xs: "stretch",
          sm: "center",
        },
      }}
    >
      <Typography variant="h5">
        {title}
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onButtonClick}
        fullWidth={{ xs: true, sm: false }}
      >
        {buttonText}
      </Button>
    </Stack>
  );
};

export default DashboardHeader;