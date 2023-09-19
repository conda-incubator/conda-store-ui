import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

import { green, purple, gray } from "./colors";

export const grayscaleTheme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif'
  },
  palette: {
    primary: {
      main: "#C4C4C4",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#7E7E7E"
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});

export const greenTheme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif'
  },
  palette: {
    primary: {
      light: green[100],
      main: green[400],
      dark: green[600],
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: gray[100],
      main: gray[400],
      dark: gray[600]
    },
    warning: {
      light: purple[100],
      main: purple[400],
      dark: purple[600]
    },
    mode: "light"
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});

export const themeDecorator = (func: any) => (
  <ThemeProvider theme={greenTheme}>{func()}</ThemeProvider>
);
