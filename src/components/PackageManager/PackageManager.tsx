import React from "react";
import { PackageManagerSearch } from "./PackageManagerSearch";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import Box from "@mui/material/Box";
import { Environment } from "src/common/models";

interface IPackageManagerProps {
  list: Environment[];
}

export const PackageManager = ({ list }: IPackageManagerProps) => {
  const namespaces: any = {};

  list.forEach(environment => {
    if (namespaces[environment.namespace.name] === undefined) {
      namespaces[environment.namespace.name] = environment.namespace;
    }
  });

  return (
    <Box sx={{ width: "313px" }}>
      <PackageManagerSearch />
      {Object.keys(namespaces).map(namespace => {
        const namespaceObj = namespaces[namespace];
        return (
          <EnvironmentDropdown
            list={list}
            namespace={namespaceObj}
            key={namespaceObj.id}
          />
        );
      })}
    </Box>
  );
};
