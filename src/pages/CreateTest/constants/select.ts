import type { SelectProps } from "@mui/material/Select";

export const selectMenuProps: SelectProps["MenuProps"] = {
  slotProps: {
    paper: {
      sx: {
        maxHeight: 280,

        "& .MuiMenuItem-root": {
          minHeight: 40,
          fontSize: 14,
        },
      },
    },
  },
};
