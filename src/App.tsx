import * as React from "react";

import "../style/index.css";
import { ChannelsEdit, ChannelsList } from "src/features/channels";
import {
  RequestedPackageList,
  RequestedPackagesEdit
} from "src/features/requestedPackages";

export const App = () => {
  const channelsList = ["conda-store", "default", "conda forge"];
  const packagesList = [
    "numpy>=4.7",
    "pandas<=3.8.1",
    "python>=1.1",
    { pip: ["test"] }
  ];

  return (
    <>
      <h1>Hello World</h1>
      <RequestedPackageList packageList={packagesList} />
      <RequestedPackagesEdit packageList={packagesList} />
      <ChannelsList channelList={channelsList} />
      <ChannelsEdit channelsList={channelsList} />
    </>
  );
};
