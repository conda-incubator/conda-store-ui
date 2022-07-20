import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ChannelsList } from "../src/features/channels";

const channelsList = ["conda-store", "default", "conda forge"];

export default {
  component: ChannelsList
} as ComponentMeta<typeof ChannelsList>;

export const Primary: ComponentStory<typeof ChannelsList> = () => (
  <ChannelsList channelList={channelsList} />
);
