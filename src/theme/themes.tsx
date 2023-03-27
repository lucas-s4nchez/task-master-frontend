import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1b998b",
    },
    secondary: {
      main: "#f0f0f0",
    },
    error: {
      main: "#ff1744",
    },
    text: {
      primary: "#252422",
      secondary: "#f1f1f1",
    },
    background: {
      paper: "#f0f0f0",
    },
  },
});
