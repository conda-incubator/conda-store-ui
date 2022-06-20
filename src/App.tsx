import * as React from "react";
import RequestedPackageList from "./components/RequestedPackageList";

const App = () => {
  return (
    <>
      <h1>Hello World</h1>
      <RequestedPackageList
        listHeight={90}
        packageList={[
          "python==3.6",
          "pandas",
          "ipykernel>=2.0",
          { pip: ["blablabla"] },
        ]}
      />
    </>
  );
};

export default App;
