import * as React from "react";
import "../style/index.css";
import { RequestedPackageList, RequestedPackagesEdit } from "./components";
import { ChannelsEdit, ChannelsList } from "./components/Channels";

const App = () => {
  const packagesList = [
    "numpy>=4.7",
    "pandas<=3.8.1",
    "python>=1.1",
    { pip: ["test"] }
  ];

  const channelsList = ["conda-store", "default", "conda forge"];

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

export default App;
