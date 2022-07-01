import * as React from "react";
import "../style/index.css";
import ChannelsEdit from "./components/Channels/ChannelsEdit";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <ChannelsEdit listHeight={100} />
    </>
  );
};

export default App;
