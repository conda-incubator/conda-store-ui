import React from "react";
import { PackageManagerSearch } from "./PackageManagerSearch";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import Box from "@mui/material/Box";
import { Environment } from "src/common/models";

interface IPackageManagerProps {
  list: Environment[];
}

export const PackageManager = ({ list }: IPackageManagerProps) => {
  return (
    <Box sx={{ width: "313px" }}>
      <PackageManagerSearch />
      <EnvironmentDropdown />
    </Box>
  );
};
