import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "src/hooks";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { SpecificationEdit, SpecificationReadOnly } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useGetBuildPackagesQuery } from "src/features/dependencies";
import { ArtifactList } from "src/features/artifacts";
import { EnvMetadata } from "src/features/metadata";
import { useCreateOrUpdateMutation } from "src/features/environmentDetails";
import artifactList from "src/utils/helpers/artifact";
import { stringify } from "yaml";

export const EnvironmentDetails = () => {
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { page } = useAppSelector(state => state.dependencies);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const environmentName = selectedEnvironment?.name || "";
  const [name, setName] = useState(environmentName);
  const environmentDescription = selectedEnvironment?.description || "";
  const [description, setDescription] = useState(environmentDescription);
  const [createOrUpdate] = useCreateOrUpdateMutation();

  if (selectedEnvironment) {
    useGetBuildQuery(selectedEnvironment.current_build_id);
    useGetBuildPackagesQuery({
      buildId: selectedEnvironment.current_build_id,
      page,
      size: 100
    });
  }

  const updateEnvironment = (code: any) => {
    const namespace = selectedEnvironment?.namespace.name;

    const environmentInfo = {
      specification: `${stringify(
        code
      )}\ndescription: ${description}\nname: ${name}\nprefix: null`,
      namespace
    };

    createOrUpdate(environmentInfo);
    console.log(environmentInfo);

    //TODO:
    // 4. SpecificationEdit Refactor - Types
    // 3. Refactor EnvironmentCreate
    // 5. Feedback errores
  };

  useEffect(() => {
    setName(environmentName);
    setDescription(environmentDescription);
  }, [selectedEnvironment]);

  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader envName={name} onUpdateName={setName} />
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
    </Box>
  );
};
