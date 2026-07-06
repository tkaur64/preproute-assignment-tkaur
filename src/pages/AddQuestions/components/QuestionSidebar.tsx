import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

interface QuestionSidebarProps {
  totalQuestions: number;
  selectedQuestion: number;
  onQuestionSelect: (questionNumber: number) => void;
}

const QuestionSidebar = ({
  totalQuestions,
  selectedQuestion,
  onQuestionSelect,
}: QuestionSidebarProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 220,
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600 }}
        >
          Question Creation
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Total Questions : {totalQuestions}
        </Typography>
      </Box>

      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {Array.from(
          { length: totalQuestions },
          (_, index) => {
            const questionNumber = index + 1;
            const selected =
              selectedQuestion === questionNumber;

            return (
              <Box
                key={questionNumber}
                onClick={() =>
                  onQuestionSelect(questionNumber)
                }
                sx={{
                  cursor: "pointer",

                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  px: 1.5,
                  py: 1,

                  borderRadius: 1,

                  border: "1px solid",

                  borderColor: selected
                    ? "primary.main"
                    : "divider",

                  bgcolor: selected
                    ? "primary.light"
                    : "background.paper",

                  transition: "all .2s",

                  "&:hover": {
                    bgcolor: selected
                      ? "primary.light"
                      : "action.hover",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: selected ? 600 : 400,
                    color: selected
                      ? "primary.main"
                      : "text.primary",
                  }}
                >
                  Question {questionNumber}
                </Typography>

                <ChevronRightIcon
                  sx={{
                    fontSize: 18,
                    color: selected
                      ? "primary.main"
                      : "text.secondary",
                  }}
                />
              </Box>
            );
          }
        )}
      </Box>
    </Paper>
  );
};

export default QuestionSidebar;