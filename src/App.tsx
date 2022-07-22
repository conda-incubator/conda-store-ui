import * as React from "react";

import "../style/index.css";
import { ChannelsEdit, ChannelsList } from "src/features/channels";
import {
  RequestedPackageList,
  RequestedPackagesEdit
} from "src/features/requestedPackages";
import { Dependencies } from "src/features/dependencies";
import { Environments } from "./features/environments";

export const App = () => {
  const channelsList = ["conda-store", "default", "conda forge"];
  const dependencies = [
    {
      id: 3685,
      channel: {
        id: 2,
        name: "https://conda.anaconda.org/conda-forge",
        last_update: null
      },
      build: "pyhd8ed1ab_0",
      license: "Apache-2.0",
      sha256:
        "4da0fe03babc950532513e9165dbc337a663880352392f496992776608dd77ca",
      name: "asttokens",
      version: "2.0.5",
      summary:
        "The asttokens module annotates Python abstract syntax trees (ASTs) with the positions of tokens and text in the source code that generated them."
    },
    {
      id: 3674,
      channel: {
        id: 2,
        name: "https://conda.anaconda.org/conda-forge",
        last_update: null
      },
      build: "pyh9f0ad1d_0",
      license: "BSD-3-Clause",
      sha256:
        "ee62d6434090c1327a48551734e06bd10e65a64ef7f3b6e68719500dab0e42b9",
      name: "backcall",
      version: "0.2.0",
      summary: "Specifications for callback functions passed in to an API"
    },
    {
      id: 3675,
      channel: {
        id: 2,
        name: "https://conda.anaconda.org/conda-forge",
        last_update: null
      },
      build: "pyh9f0ad1d_0",
      license: "BSD-3-Clause",
      sha256:
        "ee62d6434090c1327a48551734e06bd10e65a64ef7f3b6e68719500dab0e42b9",
      name: "dumpy",
      version: "1.2.0",
      summary: "Specifications for callback functions passed in to an API"
    },
    {
      id: 3673,
      channel: {
        id: 2,
        name: "https://conda.anaconda.org/conda-forge",
        last_update: null
      },
      build: "pyh9f0ad1d_0",
      license: "BSD-3-Clause",
      sha256:
        "ee62d6434090c1327a48551734e06bd10e65a64ef7f3b6e68719500dab0e42b9",
      name: "numpy",
      version: "0.2.1",
      summary: "Specifications for callback functions passed in to an API"
    }
  ];
  const packagesList = [
    "numpy>=4.7",
    "pandas<=3.8.1",
    "python>=1.1",
    { pip: ["test"] }
  ];
  const environmentsData = [
    {
      id: 2,
      namespace: {
        id: 1,
        name: "default"
      },
      name: "test_env_1",
      current_build_id: 2,
      current_build: null
    },
    {
      id: 1,
      namespace: {
        id: 2,
        name: "filesystem"
      },
      name: "python-flask-env",
      current_build_id: 1,
      current_build: null
    },
    {
      id: 3,
      namespace: {
        id: 1,
        name: "default"
      },
      name: "test_env_2",
      current_build_id: 3,
      current_build: null
    }
  ];

  return (
    <>
      <h1>Hello World</h1>
      <RequestedPackageList packageList={packagesList} />
      <RequestedPackagesEdit packageList={packagesList} />
      <ChannelsList channelList={channelsList} />
      <ChannelsEdit channelsList={channelsList} />
      <Dependencies mode="edit" dependencies={dependencies} />
      <Environments list={environmentsData} />
    </>
  );
};
