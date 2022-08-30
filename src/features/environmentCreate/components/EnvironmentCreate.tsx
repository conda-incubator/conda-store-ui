import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { EnvironmentDetailsHeader } from "src/features/environmentDetails";
import { useAppSelector } from "src/hooks";
import { EnvMetadata } from "src/features/metadata";
import { SpecificationCreate } from "./SpecificationCreate";
import { useCreateOrUpdateMutation } from "src/features/environmentDetails";
import { stringify } from "yaml";

export const EnvironmentCreate = () => {
  const { newEnvironment } = useAppSelector(state => state.tabs);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    message: "",
    visible: false
  });
  const [createOrUpdate] = useCreateOrUpdateMutation();

  const createEnvironment = async (code: any) => {
    const namespace = newEnvironment?.namespace;

    const environmentInfo = {
      specification: `${stringify(
        code
      )}\ndescription: ${description}\nname: ${name}\nprefix: null`,
      namespace
    };

    try {
      setError({
        message: "",
        visible: false
      });
      await createOrUpdate(environmentInfo).unwrap();
      // TODO Add new env to sidebar envs
      // Open in a new tab?
    } catch ({ data }) {
      setError({
        message: data.message,
        visible: true
      });
    }
  };

  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader envName={name} onUpdateName={setName} />
      {error.visible && (
        <Alert
          severity="error"
          sx={{
            mb: "20px"
          }}
        >
          {error.message}
        </Alert>
      )}
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
