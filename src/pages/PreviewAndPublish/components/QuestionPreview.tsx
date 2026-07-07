import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { Question } from "../../../types/question";

interface QuestionPreviewProps {
  question: Question | null;
}

const OPTIONS = [
  {
    key: "option1",
    label: "A",
  },
  {
    key: "option2",
    label: "B",
  },
  {
    key: "option3",
    label: "C",
  },
  {
    key: "option4",
    label: "D",
  },
] as const;

const QuestionPreview = ({
  question,
}: QuestionPreviewProps) => {
  if (!question) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          minHeight: 600,
          p: 4,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: "text.secondary", fontSize: 18 }}

        >
          No question to preview.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        minHeight: 600,
        p: 4,
      }}
    >
      <Stack spacing={4}>
        {/* Header */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600 }}
          >
            Question Preview
          </Typography>

          <Chip
            label={
              question.difficulty.charAt(0).toUpperCase() +
              question.difficulty.slice(1)
            }
            color="primary"
            size="small"
          />
        </Stack>

        <Divider />

        {/* Question */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Question
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                "& p": {
                  margin: 0,
                },
              }}
              dangerouslySetInnerHTML={{
                __html: question.question,
              }}
            />
          </Paper>
        </Box>

        {/* Options */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            Options
          </Typography>

          <Stack spacing={2}>
            {OPTIONS.map((option) => {
              const value =
                question[
                option.key as keyof Question
                ] as string;

              const isCorrect =
                question.correct_option ===
                option.key;

              return (
                <Paper
                  key={option.key}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderColor: isCorrect
                      ? "success.main"
                      : "divider",
                    bgcolor: isCorrect
                      ? "#E8F5E9"
                      : "background.paper",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                  >
                    {isCorrect ? (
                      <CheckCircleRoundedIcon
                        color="success"
                      />
                    ) : (
                      <RadioButtonUncheckedRoundedIcon
                        color="disabled"
                      />
                    )}

                    <Typography

                      sx={{
                        width: 24,
                        fontWeight: 600,
                      }}
                    >
                      {option.label}
                    </Typography>

                    <Box
                      sx={{
                        flex: 1,
                        "& p": {
                          margin: 0,
                        },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: value,
                      }}
                    />
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Box>

        {/* Explanation */}
        {question.explanation && (
          <>
            <Divider />

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Explanation
              </Typography>

              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#FAFAFA",
                }}
              >
                <Box
                  sx={{
                    "& p": {
                      margin: 0,
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      question.explanation,
                  }}
                />
              </Paper>
            </Box>
          </>
        )}

        {/* Metadata */}
        <Divider />

        <Stack
          direction="row"
          spacing={2}
          sx={{ flexWrap: "wrap" }}
        >
          <Chip
            label={`Correct Answer: ${question.correct_option.replace(
              "option",
              "Option "
            )}`}
            color="success"
          />

          {question.topic && (
            <Chip
              label={`Topic: ${question.topic}`}
              variant="outlined"
            />
          )}

          {question.sub_topic && (
            <Chip
              label={`Sub Topic: ${question.sub_topic}`}
              variant="outlined"
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuestionPreview;