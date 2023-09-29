/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme, ThemeProvider } from "@mui/material";
import { PaletteColor, PaletteColorOptions } from "@mui/material/styles"
import React from "react";

import { green, purple, gray, white, red, orange, blue, black } from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    accent: PaletteColor;
  }

  interface PaletteOptions {
    accent?: PaletteColorOptions;
  }
}

const baseTheme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif'
  }
});

export const grayscaleTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: "#C4C4C4",
      contrastText: white
    },
    secondary: {
      main: "#7E7E7E",
      contrastText: white
    }
  }
});

export const condaStoreTheme = createTheme(baseTheme, {
  palette: {
    accent: baseTheme.palette.augmentColor({
      color: {
        light: purple[300],
        main: purple[500],
        dark: purple[700],
        contrastText: white,
        50: purple[50],
        100: purple[100],
        200: purple[200],
        300: purple[300],
        400: purple[400],
        500: purple[500],
        600: purple[600],
        700: purple[700],
        800: purple[800],
        900: purple[900]
      },
      name: "accent"
    }),
    primary: baseTheme.palette.augmentColor({
      color: {
        light: green[300],
        main: green[500],
        dark: green[700],
        contrastText: white,
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
        light: gray[300],
        main: gray[500],
        dark: gray[700],
        contrastText: white,
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
    common: {
      black: black,
      white: white
    }
  }
});

export const themeDecorator = (func: any) => (
  <ThemeProvider theme={condaStoreTheme}>{func()}</ThemeProvider>
);
