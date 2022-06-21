import * as React from "react";
import "../style/index.css";
import RequestedPackageList from "./components/RequestedPackageList";
import RequestedPackagesEdit from "./components/RequestedPackagesEdit";

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <div style={{ marginBottom: "15px" }}>
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
      </div>

      <RequestedPackagesEdit />
    </div>
  );
};

export default App;
