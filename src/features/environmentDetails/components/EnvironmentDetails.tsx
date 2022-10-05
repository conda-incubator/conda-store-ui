import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { cloneDeep } from "lodash";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { SpecificationEdit, SpecificationReadOnly } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useGetBuildPackagesQuery } from "src/features/dependencies";
import { ArtifactList } from "src/features/artifacts";
import { EnvMetadata } from "src/features/metadata";
import { useGetEnviromentBuildsQuery } from "src/features/metadata";

import {
  EnvironmentDetailsModes,
  useCreateOrUpdateMutation,
  modeChanged
} from "src/features/environmentDetails";
import artifactList from "src/utils/helpers/artifact";
import { stringify } from "yaml";

export interface IEnvDetails {
  environmentNotification: (notification: any) => void;
}

export const EnvironmentDetails = ({
  environmentNotification
}: IEnvDetails) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { page } = useAppSelector(state => state.dependencies);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const [name, setName] = useState(selectedEnvironment?.name || "");
  const [createOrUpdate] = useCreateOrUpdateMutation();
  const [description, setDescription] = useState(
    selectedEnvironment ? selectedEnvironment.description : undefined
  );
  const [storagedDescription, setStoragedDescription] = useState(
    cloneDeep(description)
  );
  const [error, setError] = useState({
    message: "",
    visible: false
  });

  if (selectedEnvironment) {
    useGetBuildQuery(selectedEnvironment.current_build_id);
    useGetBuildPackagesQuery({
      buildId: selectedEnvironment.current_build_id,
      page,
      size: 100
    });
  }

  const updateEnvironment = async (code: any) => {
    const namespace = selectedEnvironment?.namespace.name;

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
      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      setStoragedDescription(description);
      environmentNotification({
        show: true,
        description: `${name} environment has been updated`
      });
    } catch (e) {
      setError({
        message: e?.data?.message ?? e.status,
        visible: true
      });
    }
  };

  useEffect(() => {
    setName(selectedEnvironment?.name || "");
    setDescription(selectedEnvironment?.description || "");
  }, [selectedEnvironment]);

  let enviromentBuilds = undefined;
  if (selectedEnvironment?.current_build_id) {
    const { data } = useGetEnviromentBuildsQuery(selectedEnvironment);
    enviromentBuilds = data;
  }

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
          selectedEnv={enviromentBuilds}
          description={description}
          current_build_id={selectedEnvironment?.current_build_id || 0}
          mode={mode}
          onUpdateDescription={setDescription}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {mode === "read-only" && <SpecificationReadOnly />}
        {mode === "edit" && (
          <SpecificationEdit
            descriptionUpdated={storagedDescription !== description}
            onUpdateEnvironment={updateEnvironment}
          />
        )}
      </Box>
      {mode === "read-only" && (
        <Box>
          <ArtifactList
            artifacts={artifactList(selectedEnvironment?.current_build_id)}
          />
        </Box>
      )}
    </Box>
  );
};
