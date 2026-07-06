export const markingFields = [
  {
    name: "wrongMarks",
    label: "Wrong Answer",
    placeholder: "-1",
    rules: {
      required: "Required",
    },
  },
  {
    name: "unattemptedMarks",
    label: "Unattempted",
    placeholder: "0",
    rules: {
      required: "Required",
      min: {
        value: 0,
        message: "Cannot be negative",
      },
    },
  },
  {
    name: "correctMarks",
    label: "Correct Answer",
    placeholder: "5",
    rules: {
      required: "Required",
      min: {
        value: 1,
        message: "Must be greater than 0",
      },
    },
  },
  {
    name: "totalQuestions",
    label: "No. of Questions",
    placeholder: "50",
    rules: {
      required: "Required",
      min: {
        value: 1,
        message: "Must be greater than 0",
      },
    },
  },
  {
    name: "totalMarks",
    label: "Total Marks",
    placeholder: "250",
    rules: {
      required: "Required",
      min: {
        value: 1,
        message: "Must be greater than 0",
      },
    },
  },
] as const;
