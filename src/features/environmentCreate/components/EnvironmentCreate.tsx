import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import {
  EnvironmentDetailsHeader,
  modeChanged,
  EnvironmentDetailsModes
} from "src/features/environmentDetails";
import { Popup } from "src/components";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { EnvMetadata } from "src/features/metadata";
import { SpecificationCreate, SpecificationReadOnly } from "./Specification";
import { useCreateOrUpdateMutation } from "src/features/environmentDetails";
import { stringify } from "yaml";

export const EnvironmentCreate = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { newEnvironment } = useAppSelector(state => state.tabs);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    message: "",
    visible: false
  });
  const [isEnvCreated, setIsEnvCreated] = useState(false);
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
      const { data } = await createOrUpdate(environmentInfo).unwrap();
      setIsEnvCreated(true);
      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      console.log(`New build id: ${data.build_id}`);
    } catch ({ data }) {
      setError({
        message: data.message,
        visible: true
      });
    }
  };

  const newEnv = { description: description };
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
          selectedEnv={newEnv}
          mode="create"
          onUpdateDescription={setDescription}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {mode === "read-only" && <SpecificationReadOnly />}
        {mode === "create" && (
          <SpecificationCreate onCreateEnvironment={createEnvironment} />
        )}
      </Box>
      <Popup
        isVisible={isEnvCreated}
        description={`${name} environment is being created`}
        onClose={setIsEnvCreated}
      />
    </Box>
  );
};
