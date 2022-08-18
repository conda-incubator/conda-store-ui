import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Environments } from "../components";

export default {
  component: Environments
} as ComponentMeta<typeof Environments>;

export const Primary: ComponentStory<typeof Environments> = () => (
  <Environments />
);
