import React from "react";
import { PackageManagerSearch } from "./PackageManagerSearch";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import Box from "@mui/material/Box";
import { Environment } from "src/common/models";
import useTheme from "@mui/material/styles/useTheme";

interface IPackageManagerProps {
  list: Environment[];
}

export const PackageManager = ({ list }: IPackageManagerProps) => {
  const {
    palette: { primary }
  } = useTheme();
  const namespaces: any = {};

  list.forEach(environment => {
    if (namespaces[environment.namespace.name] === undefined) {
      namespaces[environment.namespace.name] = environment.namespace;
    }
  });

  return (
    <Box sx={{ width: "313px", border: `1px solid ${primary.main}` }}>
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <PackageManagerSearch />
      </Box>
      <Box
        sx={{
          height: "300px",
          maxHeight: "450px",
          overflowY: "scroll",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "15px"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `${primary.main}`,
            borderRadius: "10px",
            border: "1px solid #666666"
          }
        }}
      >
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
    </Box>
  );
};
