import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { stringify } from "yaml";
import { parseArtifacts } from "../../../utils/helpers/parseArtifactList";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { SpecificationEdit, SpecificationReadOnly } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useLazyGetArtifactsQuery } from "../../artifacts";
import {
  useGetBuildPackagesQuery,
  useLazyGetBuildPackagesQuery
} from "../../../features/dependencies";
import { ArtifactList } from "../../../features/artifacts";
import {
  EnvMetadata,
  currentBuildIdChanged,
  useGetEnviromentBuildsQuery
} from "../../../features/metadata";
import {
  EnvironmentDetailsModes,
  useCreateOrUpdateMutation,
  modeChanged
} from "../../../features/environmentDetails";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import artifactList from "../../../utils/helpers/artifact";
import { CondaSpecificationPip } from "../../../common/models";
import { useInterval } from "../../../utils/helpers";

interface IEnvDetails {
  environmentNotification: (notification: any) => void;
}

interface IUpdateEnvironmentArgs {
  dependencies: (string | CondaSpecificationPip)[];
  channels: string[];
}

const INTERVAL_REFRESHING = 2000;

export const EnvironmentDetails = ({
  environmentNotification
}: IEnvDetails) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { page, dependencies } = useAppSelector(state => state.dependencies);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const { currentBuild } = useAppSelector(state => state.enviroments);
  const [name, setName] = useState(selectedEnvironment?.name || "");
  const [descriptionIsUpdated, setDescriptionIsUpdated] = useState(false);
  const [description, setDescription] = useState(
    selectedEnvironment ? selectedEnvironment.description : undefined
  );
  const [artifactType, setArtifactType] = useState<string[]>([]);
  const [error, setError] = useState({
    message: "",
    visible: false
  });
  const [triggerQuery] = useLazyGetArtifactsQuery();
  const [triggerBuildPackages] = useLazyGetBuildPackagesQuery();
  const [createOrUpdate] = useCreateOrUpdateMutation();
  useGetEnviromentBuildsQuery(selectedEnvironment, {
    pollingInterval: INTERVAL_REFRESHING
  });
  const [currentBuildId, setCurrentBuildId] = useState(
    selectedEnvironment?.current_build_id
  );

  const { isFetching } = useGetBuildQuery(currentBuildId, {
    skip: !currentBuildId
  });

  useGetBuildPackagesQuery(
    {
      buildId: currentBuildId,
      page,
      size: 100
    },
    { skip: isFetching || !currentBuildId }
  );

  const updateDescription = (description: string) => {
    setDescription(description);
    setDescriptionIsUpdated(true);
  };

  const loadArtifacts = async () => {
    console.log(artifactType);
    if (artifactType.includes("DOCKER_MANIFEST")) {
      return;
    }

    const { data } = await triggerQuery(currentBuildId);
    const apiArtifactTypes: string[] = parseArtifacts(data);
    console.log("call it", apiArtifactTypes);
    setArtifactType(apiArtifactTypes);
  };

  const loadDependencies = async () => {
    if (dependencies.length) {
      return;
    }

    await triggerBuildPackages({
      buildId: currentBuildId,
      page,
      size: 100
    });
  };

  useEffect(() => {
    setName(selectedEnvironment?.name || "");
    setDescription(selectedEnvironment?.description || "");
    setCurrentBuildId(selectedEnvironment?.current_build_id);
    setDescriptionIsUpdated(false);
    setArtifactType([]);
  }, [selectedEnvironment]);

  useEffect(() => {
    if (currentBuild.id) {
      setCurrentBuildId(currentBuild.id);
      setArtifactType([]);
    }
  }, [currentBuild]);

  const updateEnvironment = async (code: IUpdateEnvironmentArgs) => {
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
      const { data } = await createOrUpdate(environmentInfo).unwrap();
      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      setCurrentBuildId(data.build_id);
      dispatch(currentBuildIdChanged(data.build_id));
      environmentNotification({
        show: true,
        description: `${name} environment has been updated`
      });
    } catch (e) {
      setError({
        message: e?.data?.message ?? e.error ?? e.status,
        visible: true
      });
    }
  };

  useInterval(async () => {
    (async () => {
      loadArtifacts();
      loadDependencies();
    })();
  }, INTERVAL_REFRESHING);

  return (
    <Box sx={{ padding: "15px 12px" }}>
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
          mode={mode}
          currentBuildId={selectedEnvironment?.current_build_id}
          selectedBuildId={currentBuildId}
          description={description}
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
            artifacts={artifactList(currentBuildId, artifactType)}
          />
        </Box>
      )}
    </Box>
  );
};
