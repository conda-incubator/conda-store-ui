import { Meta } from "@storybook/react";
import React from "react";
import { ArtifactList } from "../components";

const artifactList = [
  {
    name: "Show lockfile",
    route: "/api/v1/build/1/lockfile/"
  },
  {
    name: "Show yml file",
    route: "/api/v1/build/1/yaml/"
  },
  {
    name: "Show Conda environment 1 log",
    route: "/api/v1/build/1/logs"
  },
  {
    name: "Download archive",
    route: "/api/v1/build/1/archive/"
  }
];

export default {
  component: ArtifactList
} as Meta<typeof ArtifactList>;

export const Primary = () => <ArtifactList artifacts={artifactList} />;
