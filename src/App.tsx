import * as React from "react";
import "../style/index.css";
import ChannelsList from "./components/Channels/ChannelsList";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <ChannelsList listHeight={100} />
    </>
  );
};

export default App;
