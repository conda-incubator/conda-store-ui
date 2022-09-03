import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ArtifactList } from "../components";

const build_id = 1;

export default {
  component: ArtifactList
} as ComponentMeta<typeof ArtifactList>;

export const Primary: ComponentStory<typeof ArtifactList> = () => (
  <ArtifactList build_id={build_id} />
);
