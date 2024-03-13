import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Provider } from "react-redux";
import React, { useEffect } from "react";

import { store } from "../../../store";
import { EnvBuilds, IEnvBuildsProps } from "../components/EnvBuilds";
import { mockBuilds } from "../mocks/mockBuilds";
import { useAppSelector } from "../../../hooks";

export default {
  component: EnvBuilds,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
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
    const [{ selectedBuildId }, updateArgs] = useArgs();
    const nextSelectedBuildId = useAppSelector(
      state => state.enviroments.newCurrentBuild
    );

    useEffect(() => {
      console.log('useEffect', nextSelectedBuildId)
      if (nextSelectedBuildId) {
        setTimeout(() => {
          updateArgs({ selectedBuildId: nextSelectedBuildId });
        });
      }
    }, [nextSelectedBuildId]);

    console.log(selectedBuildId);
    return <EnvBuilds {...args} selectedBuildId={selectedBuildId} />;
  }
};
