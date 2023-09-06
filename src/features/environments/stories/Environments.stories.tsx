import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Provider } from "react-redux";
import React from "react";

import { Environments } from "../components";
import { store } from "../../../store";

export default {
  component: Environments
} as ComponentMeta<typeof Environments>;

const Template = () => (
  <Provider store={store}>
    <Environments
      refreshEnvironments={false}
      onUpdateRefreshEnvironments={() => {}}
    />
  </Provider>
);

export const Primary: ComponentStory<typeof Environments> = Template.bind({});
