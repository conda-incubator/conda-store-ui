import * as React from "react";

import {
  ChannelsEdit,
  ChannelsList,
  PackageManager,
  RequestedPackageList,
  RequestedPackagesEdit
} from "./components";

import "../style/index.css";

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
      <PackageManager />
    </>
  );
};
