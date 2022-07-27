import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Environments } from "../components";
import { mockEnvironments } from "../mocks";

export default {
  component: Environments
} as ComponentMeta<typeof Environments>;

export const Primary: ComponentStory<typeof Environments> = () => (
  <Environments list={mockEnvironments} />
);
