import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ArtifactsList } from "../components";

const artifactList = [
  {
    name: "Link to lockfile",
    route: "/api/v1/build/1/lockfile/"
  },
  {
    name: "Link to yml file",
    route: "/api/v1/build/1/yaml/"
  },
  {
    name: "Link to archive",
    route: "/api/v1/build/1/archive/"
  },
  {
    name: "Conda Env 1 log",
    route: "/api/v1/build/1/logs"
  }
];

export default {
  component: ArtifactsList
} as ComponentMeta<typeof ArtifactsList>;

export const Primary: ComponentStory<typeof ArtifactsList> = () => (
  <ArtifactsList artifacts={artifactList} />
);
