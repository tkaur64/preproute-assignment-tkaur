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

  publishDate: string;
  onPublishDateChange: (value: string) => void;

  publishTime: string;
  onPublishTimeChange: (value: string) => void;

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
  publishDate,
  onPublishDateChange,
  publishTime,
  onPublishTimeChange,
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
        p: 4,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3 }}
      >
        Publish Settings
      </Typography>

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

      {/* Schedule Publish Fields */}
      {publishMode === "schedule" && (
        <>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Publish On
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Grid size={6}>
              <TextField
                fullWidth
                label="Publish Date"
                type="date"
                value={publishDate}
                onChange={(e) =>
                  onPublishDateChange(
                    e.target.value
                  )
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                label="Publish Time"
                type="time"
                value={publishTime}
                onChange={(e) =>
                  onPublishTimeChange(
                    e.target.value
                  )
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
          </Grid>
        </>
      )}

      {/* Live Until */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mb: 1 }}
      >
        Live Until
      </Typography>

      <Typography
        variant="body2"
        sx={{ mb: 3 }}
        color="text.secondary"
      >
        Choose how long this test should remain
        available.
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
        <>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mt: 4, mb: 2 }}
          >
            Expiry
          </Typography>

          <Grid
            container
            spacing={2}
          >
            <Grid size={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                type="date"
                value={endDate}
                onChange={(e) =>
                  onEndDateChange(
                    e.target.value
                  )
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                label="Expiry Time"
                type="time"
                value={endTime}
                onChange={(e) =>
                  onEndTimeChange(
                    e.target.value
                  )
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default PublishSettings;