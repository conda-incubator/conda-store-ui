import React, { useState } from "react";
import Box from "@mui/material/Box";
import { EnvironmentDetailsHeader } from "src/features/environmentDetails";
import { EnvMetadata } from "src/features/metadata";
import { SpecificationCreate } from "./SpecificationCreate";

export const EnvironmentCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createEnvironment = (code: any) => {
    console.log(code);
  };

  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader envName={name} onUpdateName={setName} />
      <Box sx={{ marginBottom: "30px" }}>
        <EnvMetadata
          envDescription={description}
          mode="create"
          onUpdateDescription={setDescription}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <SpecificationCreate onCreateEnvironment={createEnvironment} />
      </Box>
    </Box>
  );
};
