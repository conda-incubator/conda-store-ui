import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { RequestedPackagesEdit } from "../components";

const packageList = [
  "numpy>=4.7",
  "pandas<=3.8.1",
  "python>=1.1",
  { pip: ["test"] }
];

export default {
  component: RequestedPackagesEdit
} as ComponentMeta<typeof RequestedPackagesEdit>;

export const Primary: ComponentStory<typeof RequestedPackagesEdit> = () => (
  <RequestedPackagesEdit packageList={packageList} />
);
