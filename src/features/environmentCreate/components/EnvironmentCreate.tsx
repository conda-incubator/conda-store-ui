import React from "react";
import Box from "@mui/material/Box";
import { EnvironmentCreateHeader, SpecificationCreate } from "./";
import { EnvMetadata } from "src/features/metadata";

export const EnvironmentCreate = () => {
  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentCreateHeader />
      <Box sx={{ marginBottom: "30px" }}>
        {/* <EnvMetadata mode="create" envDescription="" /> */}
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <SpecificationCreate />
      </Box>
    </Box>
  );
};
