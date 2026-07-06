import {
  Box,
  Button,
  MenuItem,
  Paper,
  Radio,
  FormControlLabel,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBreadcrumbs from "../../components/AppBreadcrumbs/AppBreadcrumbs";
import FormField from "../../components/FormField/FormField";

import TestTypeSelector from "./components/TestTypeSelector";

import { ROUTES } from "../../constants/routes";
import { TEST_TYPE_OPTIONS } from "../../constants/test";

import type { TestType } from "../../types/test";

const markingFields = [
  {
    label: "Wrong Answer",
    placeholder: "-1",
  },
  {
    label: "Unattempted",
    placeholder: "+0",
  },
  {
    label: "Correct Answer",
    placeholder: "+5",
  },
  {
    label: "No of Questions",
    placeholder: "Ex:250 Questions",
  },
  {
    label: "Total Marks",
    placeholder: "Ex:250 Marks",
  },
];

const CreateTest = () => {
  const navigate = useNavigate();

  const [selectedTestType, setSelectedTestType] =
    useState<TestType>("chapterwise");

  return (
    <Box>
      <AppBreadcrumbs
        items={[
          {
            label: "Test Creation",
            onClick: () => navigate(ROUTES.DASHBOARD),
          },
          {
            label: "Create Test",
          },
          {
            label: TEST_TYPE_OPTIONS.find((t) => t.value === selectedTestType)?.label ?? '',
          },
        ]}
      />

      <TestTypeSelector
        value={selectedTestType}
        onChange={setSelectedTestType}
      />

      <Paper
        elevation={0}
        sx={{
          mt: 1,
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        {/* Subject + Name */}
        <Grid
          container
          spacing={2}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Subject">
              <Select
                fullWidth
                displayEmpty
                value=""
                renderValue={(selected) =>
                  selected || "Choose from Drop-down"
                }
              >
                <MenuItem value="">
                  Choose from Drop-down
                </MenuItem>
              </Select>
            </FormField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Name of Test">
              <TextField
                placeholder="Enter name of Test"
              />
            </FormField>
          </Grid>
        </Grid>

        {/* Topic + Sub Topic */}
        <Grid
          container
          spacing={3}
          sx={{ mt: 1 }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Topic">
              <Select
                fullWidth
                displayEmpty
                value=""
                renderValue={(selected) =>
                  selected || "Choose from Drop-down"
                }
              >
                <MenuItem value="">
                  Choose from Drop-down
                </MenuItem>
              </Select>
            </FormField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Sub Topic">
              <Select
                fullWidth
                displayEmpty
                value=""
                renderValue={(selected) =>
                  selected || "Choose from Drop-down"
                }
              >
                <MenuItem value="">
                  Choose from Drop-down
                </MenuItem>
              </Select>
            </FormField>
          </Grid>
        </Grid>

        {/* Duration + Difficulty */}
        <Grid
          container
          spacing={3}
          sx={{ mt: 1 }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Duration (Minutes)">
              <TextField placeholder="Enter the time" />
            </FormField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormField label="Test Difficulty Level">
              <RadioGroup
                row
                defaultValue="easy"
                sx={{
                  height: 56,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value="easy"
                  control={<Radio />}
                  label="Easy"
                />

                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium"
                />

                <FormControlLabel
                  value="difficult"
                  control={<Radio />}
                  label="Difficult"
                />
              </RadioGroup>
            </FormField>
          </Grid>
        </Grid>

        {/* Marking Scheme */}
        <Typography
          sx={{
            mt: 5,
            mb: 2,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Marking Scheme
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {markingFields.map((field) => (
            <Box
              key={field.label}
              sx={{
                flex: 1,
                minWidth: 180,
              }}
            >
              <FormField label={field.label}>
                <TextField placeholder={field.placeholder} type="number" />
              </FormField>
            </Box>
          ))}
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="text"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "primary.main",
              bgcolor: "primary.light",

              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              bgcolor: "primary.main",
              color: "#FFFFFF",
              boxShadow: "none",

              "&:hover": {
                bgcolor: "primary.main",
                boxShadow: "none",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateTest;