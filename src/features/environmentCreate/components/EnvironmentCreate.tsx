import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { stringify } from "yaml";
import {
  EnvironmentDetailsHeader,
  modeChanged,
  EnvironmentDetailsModes
} from "../../../features/environmentDetails";
import {
  environmentOpened,
  closeCreateNewEnvironmentTab
} from "../../../features/tabs";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { EnvMetadata } from "../../../features/metadata";
import { SpecificationCreate, SpecificationReadOnly } from "./Specification";
import { useCreateOrUpdateMutation } from "../../../features/environmentDetails";

export interface IEnvCreate {
  environmentNotification: (notification: any) => void;
}

export const EnvironmentCreate = ({ environmentNotification }: IEnvCreate) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.environmentDetails);
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
      namespace,
      specification: `${stringify(
        code
      )}\ndescription: ${description}\nname: ${name}\nprefix: null`
    };

    try {
      const { data } = await createOrUpdate(environmentInfo).unwrap();
      const environment = {
        name,
        current_build: null,
        current_build_id: data.build_id,
        description,
        id: data.build_id,
        namespace: {
          id: data.build_id,
          name: namespace
        }
      };

      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      dispatch(closeCreateNewEnvironmentTab());
      dispatch(
        environmentOpened({
          environment,
          selectedEnvironmentId: data.build_id
        })
      );
      environmentNotification({
        show: true,
        description: `${name} environment is being created`
      });
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
          selectedEnv={{}}
          description={description}
          current_build_id={0}
          mode={mode}
          onUpdateDescription={setDescription}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {mode === "read-only" && <SpecificationReadOnly />}
        {mode === "create" && (
          <SpecificationCreate onCreateEnvironment={createEnvironment} />
        )}
      </Box>
    </Box>
  );
};
