import { ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "../src/theme";

export const DEPENDENCIES = [
  {
    id: 3685,
    name: "asttokens",
    version: "2.0.5"
  },
  {
    id: 3675,
    name: "dumpy",
    version: "1.2.0"
  }
];

export const CHANNELS_LIST = ["conda-store", "default"];

export const DEPENDENCY = {
  id: 3685,
  channel: {
    id: 2,
    name: "https://conda.anaconda.org/conda-forge",
    last_update: null
  },
  build: "pyhd8ed1ab_0",
  license: "Apache-2.0",
  sha256: "4da0fe03babc950532513e9165dbc337a663880352392f496992776608dd77ca",
  name: "asttokens",
  version: "2.0.5",
  summary:
    "The asttokens module annotates Python abstract syntax trees (ASTs) with the positions of tokens and text in the source code that generated them."
};

export const PACKAGE_LIST = [
  "numpy>=4.7",
  "pandas<=3.8.1",
  "python>=1.1",
  { pip: ["test"] }
];

export const ENVIRONMENT = {
  id: 1,
  namespace: { id: 1, name: "default" },
  name: "env1",
  current_build_id: 1,
  current_build: 1
};

export const mockTheme = (children: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
