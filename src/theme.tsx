import { createTheme, ThemeProvider } from "@mui/material";
import * as React from "react";

export const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif'
  },
  palette: {
    primary: {
      main: "#C4C4C4"
    },
    secondary: {
      main: "#7E7E7E"
    }
  }
});

export const themeDecorator = (func: Function) => (
  <ThemeProvider theme={theme}>{func()}</ThemeProvider>
)
