import * as React from "react";
import "../style/index.css";
import { ChannelsEdit, ChannelsList } from "./components";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <ChannelsList
        channelList={["conda-store", "default", "conda forge"]}
        listHeight={213}
      />
      <ChannelsEdit
        channelsList={["conda-store", "default", "conda forge"]}
        listHeight={170}
      />
    </>
  );
};

export default App;
