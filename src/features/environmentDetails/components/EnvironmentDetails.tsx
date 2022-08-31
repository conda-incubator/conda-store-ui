import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { Popup } from "src/components";
import { SpecificationEdit, SpecificationReadOnly } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useGetBuildPackagesQuery } from "src/features/dependencies";
import { ArtifactList } from "src/features/artifacts";
import { EnvMetadata } from "src/features/metadata";
import {
  EnvironmentDetailsModes,
  useCreateOrUpdateMutation,
  modeChanged
} from "src/features/environmentDetails";
import artifactList from "src/utils/helpers/artifact";
import { stringify } from "yaml";

export const EnvironmentDetails = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { page } = useAppSelector(state => state.dependencies);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const [name, setName] = useState(selectedEnvironment?.name || "");
  const [description, setDescription] = useState(
    selectedEnvironment?.description || ""
  );
  const [createOrUpdate] = useCreateOrUpdateMutation();
  const [error, setError] = useState({
    message: "",
    visible: false
  });
  const [isEnvUpdated, setIsEnvUpdated] = useState(false);

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
      const { data } = await createOrUpdate(environmentInfo).unwrap();
      setIsEnvUpdated(true);
      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      console.log(`New build id: ${data.build_id}`);
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
          mode={mode}
          onUpdateDescription={setDescription}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        {mode === "read-only" && <SpecificationReadOnly />}
        {mode === "edit" && (
          <SpecificationEdit onUpdateEnvironment={updateEnvironment} />
        )}
      </Box>
      {mode === "read-only" && (
        <Box>
          <ArtifactList artifacts={artifactList(selectedEnvironment?.id)} />
        </Box>
      )}
      <Popup
        isVisible={isEnvUpdated}
        description="Environment has been updated"
        onClose={setIsEnvUpdated}
      />
    </Box>
  );
};
