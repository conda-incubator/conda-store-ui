import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

import { green, purple, gray, white, red, orange, blue, black } from "./colors";

export const grayscaleTheme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif'
  },
  palette: {
    primary: {
      main: "#C4C4C4",
      contrastText: white
    },
    secondary: {
      main: "#7E7E7E",
      contrastText: white
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

const baseTheme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif'
  },
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: white
    },
    secondary: {
      light: gray[300],
      main: gray[500],
      dark: gray[700],
      contrastText: white
    },
    warning: {
      main: orange,
      contrastText: white
    },
    error: {
      main: red,
      contrastText: white
    },
    info: {
      main: blue,
      contrastText: white
    },
    success: {
      main: green[500],
      contrastText: white
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

export const greenTheme = createTheme(baseTheme, {
  palette: {
    accent: baseTheme.palette.augmentColor({
      color: {
        light: purple[300],
        main: purple[500],
        dark: purple[700],
        contrastText: white
      },
      name: "accent"
    }),
    primary: baseTheme.palette.augmentColor({
      color: {
        50: green[50],
        100: green[100],
        200: green[200],
        300: green[300],
        400: green[400],
        500: green[500],
        600: green[600],
        700: green[700],
        800: green[800],
        900: green[900]
      },
      name: "primary"
    }),
    secondary: baseTheme.palette.augmentColor({
      color: {
        50: gray[50],
        100: gray[100],
        200: gray[200],
        300: gray[300],
        400: gray[400],
        500: gray[500],
        600: gray[600],
        700: gray[700],
        800: gray[800],
        900: gray[900]
      },
      name: "secondary"
    }),
    white: baseTheme.palette.augmentColor({
      color: {
        main: white,
        contrastText: black
      },
      name: "white"
    }),
    black: baseTheme.palette.augmentColor({
      color: {
        main: black,
        contrastText: white
      },
      name: "black"
    })
  }
});

export const themeDecorator = (func: any) => (
  <ThemeProvider theme={greenTheme}>{func()}</ThemeProvider>
);
