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
  const packageManagerData = [
    {
      id: 2,
      namespace: {
        id: 1,
        name: "default"
      },
      name: "test_env_1",
      current_build_id: 2,
      current_build: null
    },
    {
      id: 1,
      namespace: {
        id: 2,
        name: "filesystem"
      },
      name: "python-flask-env",
      current_build_id: 1,
      current_build: null
    },
    {
      id: 3,
      namespace: {
        id: 1,
        name: "default"
      },
      name: "test_env_2",
      current_build_id: 3,
      current_build: null
    }
  ];

  return (
    <>
      <h1>Hello World</h1>
      <RequestedPackageList packageList={packagesList} />
      <RequestedPackagesEdit packageList={packagesList} />
      <ChannelsList channelList={channelsList} />
      <ChannelsEdit channelsList={channelsList} />
      <PackageManager list={packageManagerData} />
    </>
  );
};
