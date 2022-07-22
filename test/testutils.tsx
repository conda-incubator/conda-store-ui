import { ThemeProvider } from "@mui/material";
import React from "react";

import { theme } from "../src/theme";

export const mockTheme = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
