import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import React from "react";

import { RequestedPackagesEdit } from "../components";
import { store } from "../../../store";

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
  <Provider store={store}>
    <RequestedPackagesEdit packageList={packageList} />
  </Provider>
);
