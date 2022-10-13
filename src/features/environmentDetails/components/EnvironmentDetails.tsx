import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { stringify } from "yaml";
import { parseArtifacts } from "../../../utils/helpers/parseArtifactList";

import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { SpecificationEdit, SpecificationReadOnly } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useGetArtifactsQuery } from "../../artifacts";
import { useGetBuildPackagesQuery } from "../../../features/dependencies";
import { ArtifactList } from "../../../features/artifacts";
import {
  EnvMetadata,
  useLazyGetEnviromentBuildsQuery
} from "../../../features/metadata";
import {
  EnvironmentDetailsModes,
  useCreateOrUpdateMutation,
  modeChanged
} from "../../../features/environmentDetails";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import artifactList from "../../../utils/helpers/artifact";

interface IEnvDetails {
  environmentNotification: (notification: any) => void;
}

export const EnvironmentDetails = ({
  environmentNotification
}: IEnvDetails) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { page } = useAppSelector(state => state.dependencies);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const [enviromentBuilds, setEnviromentBuilds] = useState<any>([]);
  const [name, setName] = useState(selectedEnvironment?.name || "");
  const [createOrUpdate] = useCreateOrUpdateMutation();
  const [descriptionIsUpdated, setDescriptionIsUpdated] = useState(false);
  const [description, setDescription] = useState(
    selectedEnvironment ? selectedEnvironment.description : undefined
  );
  const [envIsUpdated, setEnvIsUpdated] = useState(false);
  const [error, setError] = useState({
    message: "",
    visible: false
  });

  const [triggerQuery] = useLazyGetEnviromentBuildsQuery();

  if (selectedEnvironment) {
    useGetBuildQuery(selectedEnvironment.current_build_id);
    useGetBuildPackagesQuery({
      buildId: selectedEnvironment.current_build_id,
      page,
      size: 100
    });
  }

  const updateDescription = (description: string) => {
    setDescription(description);
    setDescriptionIsUpdated(true);
  };

  const { data } = useGetArtifactsQuery(selectedEnvironment?.current_build_id);
  const apiArtifactTypes: string[] = parseArtifacts(data);

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
      environmentNotification({
        show: true,
        description: `${name} environment has been updated`
      });
      setEnvIsUpdated(true);
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
    setDescriptionIsUpdated(false);

    (async () => {
      const { data } = await triggerQuery(selectedEnvironment);
      setEnviromentBuilds(data);
    })();
  }, [selectedEnvironment, envIsUpdated]);

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
          onUpdateDescription={updateDescription}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {mode === "read-only" && <SpecificationReadOnly />}
        {mode === "edit" && (
          <SpecificationEdit
            descriptionUpdated={descriptionIsUpdated}
            onUpdateEnvironment={updateEnvironment}
          />
        )}
      </Box>
      {mode === "read-only" && (
        <Box>
          <ArtifactList
            artifacts={artifactList(
              selectedEnvironment?.current_build_id,
              apiArtifactTypes
            )}
          />
        </Box>
      )}
    </Box>
  );
};
