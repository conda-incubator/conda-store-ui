import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Provider } from "react-redux";
import React from "react";

import { store } from "../../../store";
import { EnvBuilds, IEnvBuildsProps } from "../components/EnvBuilds";
import { mockBuilds } from "../mocks/mockBuilds";

export default {
  component: EnvBuilds,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
} as Meta<typeof EnvBuilds>;

type Story = StoryObj<typeof EnvBuilds>;

export const Primary: Story = {
  args: {
    currentBuildId: 1,
    selectedBuildId: 1,
    mode: "read-only",
    builds: mockBuilds
  },
  render: function Render(args: IEnvBuildsProps) {
    const [{ selectedBuildId = args.selectedBuildId }, updateArgs] = useArgs();

    const handleChangeToSelectedBuildId = () => {
      const { id: nextSelectedBuildId = args.selectedBuildId } =
        store.getState().enviroments.currentBuild;
      updateArgs({ selectedBuildId: nextSelectedBuildId });
    };

    store.subscribe(handleChangeToSelectedBuildId);

    return <EnvBuilds {...args} selectedBuildId={selectedBuildId} />;
  }
};
