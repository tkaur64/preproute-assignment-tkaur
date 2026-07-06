import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { TEST_TYPE_OPTIONS } from "../../constants/test";
import type { Test } from "../../types/test";

interface TestOverviewCardProps {
  test: Test;
  showEditButton?: boolean;
  onEdit?: () => void;
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <Stack
    direction="row"
    spacing={2}
    sx={{ alignItems: "center" }}
  >
    <Typography
      sx={{
        width: 60,
        fontSize: 11,
        color: "text.secondary",
      }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        fontSize: 13,
      }}
    >
      :
    </Typography>

    {value}
  </Stack>
);

const StatChip = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <Stack
    direction="row"
    spacing={0.5}
    sx={{
      px: 0.75,
      py: 0.4,
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 1,
      bgcolor: "common.white",
      alignItems: "center",
    }}
  >
    {icon}

    <Typography
      sx={{
        fontSize: 11,
        color: "text.secondary",
      }}
    >
      {label}
    </Typography>
  </Stack>
);

const TestOverviewCard = ({
  test,
  showEditButton = true,
  onEdit,
}: TestOverviewCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        p: 2.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box

      >
        <Chip
          label={TEST_TYPE_OPTIONS.find((option) => option.value === test.type)?.label ?? ''}
          size="small"
          sx={{
            height: 22,
            bgcolor: "#0A0D45",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
          }}
        />

        {showEditButton && (
          <IconButton
            size="small"
            onClick={onEdit}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
            }}
          >
            <EditOutlinedIcon
              fontSize="small"
              color="primary"
            />
          </IconButton>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: 2,
        }}
      > <Box
      >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              mb: 2
            }}
          >
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {test.name}
            </Typography>

            <Chip
              label={
                test.difficulty.charAt(0).toUpperCase() +
                test.difficulty.slice(1)
              }
              size="small"
              sx={{
                height: 22,
                bgcolor: "#35C2AF",
                color: "#fff",
                fontSize: 11,
              }}
            />
          </Stack>

          <Stack spacing={1}>
            <DetailRow
              label="Subject"
              value={<Typography sx={{ fontSize: 13 }}>{test.subject}</Typography>}
            />

            <DetailRow
              label="Topic"
              value={
                <Stack
                  direction="row"
                  spacing={0.5}
                >
                  {test.topics.map((topic) => (
                    <Chip
                      key={topic}
                      label={topic}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 22,
                        fontSize: 11,
                        color: "#F4A100",
                        borderColor: "#F4A100",
                      }}
                    />
                  ))}
                </Stack>
              }
            />

            <DetailRow
              label="Sub Topic"
              value={
                <Stack
                  direction="row"
                  spacing={0.5}
                >
                  {test.sub_topics.map((subTopic) => (
                    <Chip
                      key={subTopic}
                      label={subTopic}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 22,
                        fontSize: 11,
                        color: "#F4A100",
                        borderColor: "#F4A100",
                      }}
                    />
                  ))}
                </Stack>
              }
            />
          </Stack>

        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "flex-end" }}
        >
          <StatChip
            icon={<AccessTimeOutlinedIcon sx={{ fontSize: 14 }} />}
            label={`${test.total_time} Min`}
          />

          <StatChip
            icon={<AssignmentOutlinedIcon sx={{ fontSize: 14 }} />}
            label={`${test.total_questions} Q's`}
          />

          <StatChip
            icon={<LeaderboardOutlinedIcon sx={{ fontSize: 14 }} />}
            label={`${test.total_marks} Marks`}
          />
        </Stack></Box>


    </Paper >
  );
};

export default TestOverviewCard;