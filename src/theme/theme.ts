import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5988EF",
    },
    action: {
      selected: "#EEF4FF",
    },
    text: {
      primary: "#111827",
      secondary: "#374151",
      disabled: "#9CA3AF",
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },

    error: {
      main: "#DC2626",
    },

    success: {
      main: "#16A34A",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",

    h5: {
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "150%",
      letterSpacing: 0,
    },

    body1: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "150%",
      letterSpacing: 0,
    },

    body2: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "150%",
      letterSpacing: 0,
    },

    caption: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "150%",
      letterSpacing: 0,
    },
  },

  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 8,

          padding: "0 20px",

          textTransform: "none",

          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "150%",

          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;
