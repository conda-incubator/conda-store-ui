import { ThemeProvider } from "@mui/material";
import React from "react";
import { CondaSpecification } from "../src/common/models";
import { condaStoreTheme } from "../src/theme";

export const NAMESPACES = [
  {
    id: 0,
    name: "default"
  },
  {
    id: 1,
    name: "admin"
  }
];
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

export const PACKAGE_LIST = ["numpy>=4.7", "pandas<=3.8.1", "python>=1.1"];

export const ENVIRONMENT = {
  id: 1,
  namespace: { id: 1, name: "default" },
  name: "python-flask-env-2",
  current_build_id: 1,
  current_build: 1,
  description: "test"
};

export const ENVIRONMENTS = [
  ENVIRONMENT,
  {
    id: 2,
    namespace: {
      id: 1,
      name: "default"
    },
    name: "new-test-env",
    description: "test",
    current_build_id: 2,
    current_build: null
  }
];

export const BUILD = {
  id: 1,
  environment_id: 1,
  specification: {
    id: 1,
    name: "test",
    spec: {} as CondaSpecification,
    sha256: "697434666a1c747d80df95189ad5750c1496287871779d2a2919db6cb768a182",
    created_on: "2022-11-08T14:28:05.655564"
  },
  packages: [],
  status: "COMPLETED",
  size: 0,
  scheduled_on: "2022-11-08T14:28:05.655564",
  started_on: "2022-11-08T14:28:05.655564",
  ended_on: "2022-11-08T14:28:05.655564",
  build_artifacts: [],
  status_info: null
};

export const mockTheme = (children: any) => {
  return <ThemeProvider theme={condaStoreTheme}>{children}</ThemeProvider>;
};
