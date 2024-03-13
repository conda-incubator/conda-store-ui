import { Meta } from "@storybook/react";
import { Provider } from "react-redux";
import React from "react";

import { Dependencies, IDependenciesProps } from "../components";
import { mockDependenciesList } from "../mocks";
import { store } from "../../../store";

export default {
  component: Dependencies
} as Meta<typeof Dependencies>;

const Template = (args: IDependenciesProps) => (
  <Provider store={store}>
    <Dependencies
      hasMore={false}
      mode={args.mode}
      dependencies={args.dependencies}
    />
  </Provider>
);

export const Primary = Template.bind({});

Primary.args = {
  mode: "edit",
  dependencies: mockDependenciesList
};
