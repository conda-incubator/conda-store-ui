import { Meta } from "@storybook/react";
import React from "react";
import { RequestedPackageList } from "../components";

const packageList = [
  "numpy>=4.7",
  "pandas<=3.8.1",
  "python>=1.1",
  { pip: ["test"] }
];

export default {
  component: RequestedPackageList
} as Meta<typeof RequestedPackageList>;

export const Primary = () => <RequestedPackageList packageList={packageList} />;
