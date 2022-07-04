import * as React from "react";
import "../style/index.css";
import { RequestedPackageList, RequestedPackagesEdit } from "./components";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <RequestedPackageList
        listHeight={90}
        packageList={[
          "numpy>=4.7",
          "pandas<=3.8.1",
          "python>=1.1",
          { pip: ["test"] }
        ]}
      />

      <RequestedPackagesEdit
        packageList={[
          "numpy>=4.7",
          "pandas<=3.8.1",
          "python>=1.1",
          { pip: ["test"] }
        ]}
        listHeight={215}
      />
    </>
  );
};

export default App;
