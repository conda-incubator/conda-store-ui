import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { stringify } from "yaml";
import { parseArtifacts } from "../../../utils/helpers/parseArtifactList";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { SpecificationEdit, SpecificationReadOnly } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import {
  updateEnvironmentBuildId,
  environmentClosed
} from "../../../features/tabs";
import {
  useGetBuildPackagesQuery,
  useLazyGetBuildPackagesQuery
} from "../../../features/dependencies";
import {
  useLazyGetArtifactsQuery,
  ArtifactList
} from "../../../features/artifacts";
import {
  EnvMetadata,
  currentBuildIdChanged,
  useGetEnviromentBuildsQuery
} from "../../../features/metadata";
import {
  EnvironmentDetailsModes,
  useCreateOrUpdateMutation,
  useUpdateBuildIdMutation,
  useDeleteEnvironmentMutation,
  modeChanged
} from "../../../features/environmentDetails";
import artifactList from "../../../utils/helpers/artifact";
import createLabel from "../../../common/config/labels";
import { AlertDialog } from "../../../components/Dialog";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { CondaSpecificationPip } from "../../../common/models";
import { useInterval } from "../../../utils/helpers";

interface IEnvDetails {
  scrollRef: any;
  environmentNotification: (notification: any) => void;
}
interface IUpdateEnvironmentArgs {
  dependencies: (string | CondaSpecificationPip)[];
  channels: string[];
}

const INTERVAL_REFRESHING = 5000;

export const EnvironmentDetails = ({
  scrollRef,
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
  const [currentBuildId, setCurrentBuildId] = useState(
    selectedEnvironment?.current_build_id
  );
  const [artifactType, setArtifactType] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [defaultEnvIsChanged, setDefaultEnvIsChanged] = useState(false);
  const [specificationIsChanged, setSpecificationIsChanged] = useState(false);
  const [error, setError] = useState({
    message: "",
    visible: false
  });

  const [triggerQuery] = useLazyGetArtifactsQuery();
  const [triggerBuildPackages] = useLazyGetBuildPackagesQuery();
  const [createOrUpdate] = useCreateOrUpdateMutation();
  const [updateBuildId] = useUpdateBuildIdMutation();
  const [deleteEnvironment] = useDeleteEnvironmentMutation();

  useGetEnviromentBuildsQuery(selectedEnvironment, {
    pollingInterval: INTERVAL_REFRESHING
  });

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

  const updateSpecificationIsChanged = (isChanged: boolean) => {
    setSpecificationIsChanged(isChanged);
  };

  const updateDefaultEnvironment = (isChanged: boolean) => {
    setDefaultEnvIsChanged(isChanged);
  };

  const loadArtifacts = async () => {
    if (artifactType.includes("DOCKER_MANIFEST")) {
      return;
    }

    const { data } = await triggerQuery(currentBuildId);
    const apiArtifactTypes: string[] = parseArtifacts(data);
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
    setError({
      message: "",
      visible: false
    });
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
    if (!selectedEnvironment) {
      return;
    }

    const namespace = selectedEnvironment.namespace.name;
    const environment = selectedEnvironment.name;
    const environmentInfo = {
      specification: `${stringify(
        code
      )}\ndescription: ${description}\nname: ${environment}\nprefix: null`,
      namespace
    };

    try {
      const { data } = await createOrUpdate(environmentInfo).unwrap();
      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      setCurrentBuildId(data.build_id);
      dispatch(currentBuildIdChanged(data.build_id));
      environmentNotification({
        data: {
          show: true,
          description: createLabel(environment, "update")
        }
      });
    } catch (e) {
      setError({
        message:
          e?.data?.message ??
          e.error ??
          e.status ??
          createLabel(undefined, "error"),
        visible: true
      });
    }
    scrollRef.current.scrollTo(0, 0);
  };

  const updateBuild = async (buildId: number) => {
    if (!selectedEnvironment) {
      return;
    }
    try {
      await updateBuildId({
        namespace: selectedEnvironment.namespace.name,
        environment: selectedEnvironment.name,
        buildId
      }).unwrap();
      dispatch(updateEnvironmentBuildId(buildId));
      environmentNotification({
        data: {
          show: true,
          description: createLabel(selectedEnvironment.name, "updateBuild")
        }
      });
    } catch (e) {
      setError({
        message: createLabel(undefined, "error"),
        visible: true
      });
    }
  };

  const deleteSelectedEnvironment = async () => {
    if (!selectedEnvironment) {
      return;
    }
    try {
      await deleteEnvironment({
        namespace: selectedEnvironment.namespace.name,
        environment: selectedEnvironment.name
      }).unwrap();

      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      dispatch(
        environmentClosed({
          envId: selectedEnvironment.id,
          selectedEnvironmentId: selectedEnvironment.id
        })
      );
      environmentNotification({
        data: {
          show: true,
          description: createLabel(selectedEnvironment.name, "delete")
        }
      });
    } catch (e) {
      setError({
        message: createLabel(undefined, "error"),
        visible: true
      });
    }
    scrollRef.current.scrollTo(0, 0);
    setShowDialog(false);
  };

  useInterval(async () => {
    (async () => {
      loadArtifacts();
      loadDependencies();
    })();
  }, INTERVAL_REFRESHING);

  return (
    <Box sx={{ padding: "15px 12px" }}>
      <EnvironmentDetailsHeader
        envName={name}
        onUpdateName={setName}
        showEditButton={selectedEnvironment?.canUpdate}
      />
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
          specificationIsChanged={specificationIsChanged}
          onDefaultEnvIsChanged={updateDefaultEnvironment}
          onUpdateDescription={updateDescription}
          onUpdateBuildId={updateBuild}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {mode === "read-only" && <SpecificationReadOnly />}
        {mode === "edit" && (
          <SpecificationEdit
            descriptionUpdated={descriptionIsUpdated}
            defaultEnvIsChanged={defaultEnvIsChanged}
            onSpecificationIsChanged={updateSpecificationIsChanged}
            onDefaultEnvIsChanged={updateDefaultEnvironment}
            onUpdateEnvironment={updateEnvironment}
            onShowDialogAlert={showDialog => setShowDialog(showDialog)}
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
      {selectedEnvironment && (
        <AlertDialog
          title="Delete Environment"
          description={createLabel(selectedEnvironment.name, "confirm")}
          isOpen={showDialog}
          closeAction={() => setShowDialog(false)}
          confirmAction={deleteSelectedEnvironment}
        />
      )}
    </Box>
  );
};
