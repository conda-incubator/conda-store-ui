import * as React from "react";
import "./index.css";
import RequestedPackageList from "./components/RequestedPackageList";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <RequestedPackageList
        listHeight={90}
        packageList={[
          "python=3.6",
          "pandas",
          "ipykernel>=2.0",
          "package1",
          "package2<=5.3",
          "package3>4.0",
          "package4<2.3",
          { pip: ["blablabla"] },
        ]}
      />
    </>
  );
};

export default App;
