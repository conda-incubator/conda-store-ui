import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { RequestedPackageList } from "../src/features/requestedPackages";

const packageList = [
  "numpy>=4.7",
  "pandas<=3.8.1",
  "python>=1.1",
  { pip: ["test"] }
];

export default {
  component: RequestedPackageList
} as ComponentMeta<typeof RequestedPackageList>;

export const Primary: ComponentStory<typeof RequestedPackageList> = () => (
  <RequestedPackageList packageList={packageList} />
);
