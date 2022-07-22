import * as React from "react";

import "../style/index.css";
import { ChannelsEdit, ChannelsList } from "src/features/channels";
import {
  RequestedPackageList,
  RequestedPackagesEdit
} from "src/features/requestedPackages";
import { Dependencies } from "src/features/dependencies";
import { ArtifactsList } from "src/features/artifacts";

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
  const linkList = [
    {
      name: "Link to lockfile",
      route: "/api/v1/build/{build_id}/lockfile/"
    },
    {
      name: "Link to yml file",
      route: "/api/v1/build/{build_id}/yaml/"
    },
    {
      name: "Link to archive",
      route: "/api/v1/build/{build_id}/archive/"
    },
    {
      name: "Conda Env {build_id} log",
      route: "/api/v1/build/{build_id}/logs"
    }
  ];
  return (
    <>
      <h1>Hello World</h1>
      <RequestedPackageList packageList={packagesList} />
      <RequestedPackagesEdit packageList={packagesList} />
      <ArtifactsList linkList={linkList} />
      <ChannelsList channelList={channelsList} />
      <ChannelsEdit channelsList={channelsList} />
      <Dependencies mode="edit" dependencies={dependencies} />
    </>
  );
};
