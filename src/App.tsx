import * as React from "react";
import "../style/index.css";
import { ChannelsList } from "./components";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <ChannelsList channelList={["conda forge", "pandas", "conda-store"]} />
    </>
  );
};

export default App;
