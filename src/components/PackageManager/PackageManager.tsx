import React from "react";
import { PackageManagerSearch } from "./PackageManagerSearch";
import { EnvironmentDropdown } from "./EnvironmentDropdown";
import Box from "@mui/material/Box";

export const PackageManager = () => {
  return (
    <Box sx={{ width: "313px" }}>
      <PackageManagerSearch />
      <EnvironmentDropdown />
    </Box>
  );
};
