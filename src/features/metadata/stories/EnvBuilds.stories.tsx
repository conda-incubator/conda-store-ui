import type { Story, ComponentMeta } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import { Provider } from "react-redux";
import React, { useEffect } from "react";

import { store } from "../../../store";
import { EnvBuilds, IEnvBuildsProps } from "../components/EnvBuilds";
import { mockBuilds } from "../mocks/mockBuilds";
import { useAppSelector } from "../../../hooks";

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
  ],
  render: function Render(args: IEnvBuildsProps) {
    const [{ selectedBuildId }, updateArgs] = useArgs();
    const nextSelectedBuildId = useAppSelector(
      state => state.enviroments.newCurrentBuild
    );

    useEffect(() => {
      updateArgs({ selectedBuildId: nextSelectedBuildId });
    }, [nextSelectedBuildId]);

    return <EnvBuilds {...args} selectedBuildId={selectedBuildId} />;
  }
};
