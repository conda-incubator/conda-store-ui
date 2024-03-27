import { Meta } from "@storybook/react";
import React from "react";
import { ChannelsEdit } from "../components";

const channelsList = ["conda-store", "default", "conda forge"];

export default {
  component: ChannelsEdit
} as Meta<typeof ChannelsEdit>;

export const Primary = () => (
  <ChannelsEdit channelsList={channelsList} updateChannels={() => ({})} />
);
