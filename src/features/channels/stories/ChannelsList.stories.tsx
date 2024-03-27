import { Meta } from "@storybook/react";
import React from "react";
import { ChannelsList } from "../components";

const channelsList = ["conda-store", "default", "conda forge"];

export default {
  component: ChannelsList
} as Meta<typeof ChannelsList>;

export const Primary = () => <ChannelsList channelList={channelsList} />;
