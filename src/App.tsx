import * as React from "react";
import "../style/index.css";
import ChannelsList from "./components/Channels/ChannelsList";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <ChannelsList
        channelList={["conda forge", "pandas", "conda-store"]}
        listHeight={120}
      />
    </>
  );
};

export default App;
