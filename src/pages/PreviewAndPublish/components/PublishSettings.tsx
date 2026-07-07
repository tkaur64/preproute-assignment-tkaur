import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export type PublishMode = "publishNow" | "schedule";

export type LiveUntil =
  | "always"
  | "1week"
  | "2weeks"
  | "3weeks"
  | "1month"
  | "custom";

interface PublishSettingsProps {
  publishMode: PublishMode;
  onPublishModeChange: (value: PublishMode) => void;

  liveUntil: LiveUntil;
  onLiveUntilChange: (value: LiveUntil) => void;

  endDate: string;
  onEndDateChange: (value: string) => void;

  endTime: string;
  onEndTimeChange: (value: string) => void;
}

const PublishSettings = ({
  publishMode,
  onPublishModeChange,
  liveUntil,
  onLiveUntilChange,
  endDate,
  onEndDateChange,
  endTime,
  onEndTimeChange,
}: PublishSettingsProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 4,
      }}
    >
      {/* Publish Mode */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Button
          variant={
            publishMode === "publishNow"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            onPublishModeChange("publishNow")
          }
          sx={{
            textTransform: "none",
            minWidth: 180,
          }}
        >
          Publish Now
        </Button>

        <Button
          variant={
            publishMode === "schedule"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            onPublishModeChange("schedule")
          }
          sx={{
            textTransform: "none",
            minWidth: 180,
          }}
        >
          Schedule Publish
        </Button>
      </Stack>

      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
      >
        Live Until
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Choose how long this test should remain
        available on the platform.
      </Typography>

      <RadioGroup
        value={liveUntil}
        onChange={(e) =>
          onLiveUntilChange(
            e.target.value as LiveUntil
          )
        }
      >
        <Grid
          container
          spacing={2}
        >
          <Grid size={6}>
            <FormControlLabel
              value="always"
              control={<Radio />}
              label="Always Available"
            />
          </Grid>

          <Grid size={6}>
            <FormControlLabel
              value="3weeks"
              control={<Radio />}
              label="3 Weeks"
            />
          </Grid>

          <Grid size={6}>
            <FormControlLabel
              value="1week"
              control={<Radio />}
              label="1 Week"
            />
          </Grid>

          <Grid size={6}>
            <FormControlLabel
              value="1month"
              control={<Radio />}
              label="1 Month"
            />
          </Grid>

          <Grid size={6}>
            <FormControlLabel
              value="2weeks"
              control={<Radio />}
              label="2 Weeks"
            />
          </Grid>

          <Grid size={6}>
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Custom Duration"
            />
          </Grid>
        </Grid>
      </RadioGroup>

      {liveUntil === "custom" && (
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 3 }}
        >
          <TextField
            fullWidth
            type="date"
            value={endDate}
            onChange={(e) =>
              onEndDateChange(e.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            fullWidth
            type="time"
            value={endTime}
            onChange={(e) =>
              onEndTimeChange(e.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Stack>
      )}
    </Paper>
  );
};

export default PublishSettings;