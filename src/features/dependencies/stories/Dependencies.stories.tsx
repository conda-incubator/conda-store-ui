import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Dependencies, IDependenciesProps } from "../components";
import { mockDependenciesList } from "../mocks";

export default {
  component: Dependencies
} as ComponentMeta<typeof Dependencies>;

const Template = (args: IDependenciesProps) => (
  <Dependencies mode={args.mode} dependencies={args.dependencies} />
);

export const Primary: ComponentStory<typeof Dependencies> = Template.bind({});

Primary.args = {
  mode: "edit",
  dependencies: mockDependenciesList
};
