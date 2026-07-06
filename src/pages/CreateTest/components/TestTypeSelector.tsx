import { Button, Paper } from "@mui/material";

import { TEST_TYPE_LABELS, TEST_TYPE_OPTIONS } from "../../../constants/test";
import type { TestType } from "../../../types/test";

interface TestTypeSelectorProps {
  value: TestType;
  onChange: (value: TestType) => void;
}

const TestTypeSelector = ({
  value,
  onChange,
}: TestTypeSelectorProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "inline-flex",
        alignItems: "center",

        p: "8px",

        border: "1px solid",
        borderColor: "divider",

        borderRadius: "16px",

        bgcolor: "background.paper",

        gap: "8px",
      }}
    >
      {TEST_TYPE_OPTIONS.map(({ value: optionValue, label }) => {
        const selected = value === optionValue;

        return (
          <Button
            key={optionValue}
            onClick={() => onChange(optionValue as TestType)}
            disableElevation
            sx={{
              width: 107,
              minWidth: 107,
              height: 40,

              px: "11px",
              py: "3px",

              borderRadius: "8px",

              textTransform: "none",

              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "150%",

              color: selected ? "primary.main" : "text.secondary",

              bgcolor: selected ? "primary.light" : "transparent",

              boxShadow: "none",

              "&:hover": {
                bgcolor: selected ? "primary.light" : "transparent",
                boxShadow: "none",
              },
            }}
          >
            {label}
          </Button>
        );
      })}
    </Paper>
  );
};

export default TestTypeSelector;