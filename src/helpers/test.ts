import type { ChipProps } from "@mui/material";

export const getStatusChip = (
  status: string | null,
): {
  label: string;
  color: ChipProps["color"];
} => {
  switch (status) {
    case "published":
      return {
        label: "Published",
        color: "success",
      };

    case "draft":
      return {
        label: "Draft",
        color: "warning",
      };

    default:
      return {
        label: "Unknown",
        color: "default",
      };
  }
};
