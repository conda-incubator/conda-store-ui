import type { Story, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import React from "react";

import { store } from "../../../store";
import { EnvBuilds } from "../components";
import { mockBuilds } from "../mocks";

export default {
  component: EnvBuilds
} as ComponentMeta<typeof EnvBuilds>;

export const Primary = {
  args: {
    currentBuildId: 1,
    selectedBuildId: 1,
    mode: "read-only",
    builds: mockBuilds
  },
  decorators: [
    (Story: Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
};
