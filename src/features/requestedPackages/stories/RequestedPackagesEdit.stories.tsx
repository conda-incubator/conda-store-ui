import { Meta } from "@storybook/react";
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
} as Meta<typeof RequestedPackagesEdit>;

export const Primary = () => (
  <Provider store={store}>
    <RequestedPackagesEdit
      namespaceName="test_namespace"
      environmentName="test_environment"
      packageList={packageList}
    />
  </Provider>
);
