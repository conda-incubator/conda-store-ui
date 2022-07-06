import * as React from "react";
import "../style/index.css";
import { RequestedPackageList, RequestedPackagesEdit } from "./components";

const App = () => {
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
    </>
  );
};

export default App;
