import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChannelsEdit } from "../components";

const channelsList = ["conda-store", "default", "conda forge"];

export default {
  component: ChannelsEdit
} as ComponentMeta<typeof ChannelsEdit>;

export const Primary: ComponentStory<typeof ChannelsEdit> = () => (
  <ChannelsEdit channelsList={channelsList} updateChannels={() => ({})} />
);
