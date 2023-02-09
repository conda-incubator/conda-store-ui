import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { stringify } from "yaml";
import {
  EnvironmentDetailsHeader,
  modeChanged,
  EnvironmentDetailsModes,
  useCreateOrUpdateMutation
} from "../../../features/environmentDetails";
import {
  currentBuildIdChanged,
  EnvMetadata,
  useLazyGetEnviromentBuildQuery
} from "../../../features/metadata";
import {
  environmentOpened,
  closeCreateNewEnvironmentTab
} from "../../../features/tabs";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { SpecificationCreate, SpecificationReadOnly } from "./Specification";
import { debounce } from "lodash";
import { descriptionChanged, nameChanged } from "../environmentCreateSlice";

export interface IEnvCreate {
  environmentNotification: (notification: any) => void;
}

interface ICreateEnvironmentArgs {
  code: { channels: string[]; dependencies: string[] };
}

export const EnvironmentCreate = ({ environmentNotification }: IEnvCreate) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { name, description } = useAppSelector(
    state => state.environmentCreate
  );
  const { newEnvironment } = useAppSelector(state => state.tabs);
  const [error, setError] = useState({
    message: "",
    visible: false
  });
  const [createOrUpdate] = useCreateOrUpdateMutation();
  const [triggerQuery] = useLazyGetEnviromentBuildQuery();

  const handleChangeName = debounce((value: string) => {
    dispatch(nameChanged(value));
  }, 300);

  const handleChangeDescription = debounce((value: string) => {
    dispatch(descriptionChanged(value));
  }, 300);

  const createEnvironment = async (code: ICreateEnvironmentArgs) => {
    const namespace = newEnvironment?.namespace;
    const environmentInfo = {
      namespace,
      specification: `${stringify(
        code
      )}\ndescription: ${description}\nname: ${name}\nprefix: null`
    };

    try {
      const { data } = await createOrUpdate(environmentInfo).unwrap();
      const { data: envInfo } = await triggerQuery(data.build_id);
      const newEnvId = envInfo?.data?.environment_id ?? data.build_id;

      const environment = {
        name,
        current_build: null,
        current_build_id: data.build_id,
        description,
        id: newEnvId,
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
          selectedEnvironmentId: newEnvId
        })
      );
      dispatch(currentBuildIdChanged(data.build_id));
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
      <EnvironmentDetailsHeader onUpdateName={handleChangeName} />
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
          mode={mode}
          onUpdateDescription={handleChangeDescription}
          onUpdateBuildId={() => {}}
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
