import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";

export const mockTheme = (children: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
