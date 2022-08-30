import React from "react";
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
    const name = selectedEnvironment?.name;
    const namespace = selectedEnvironment?.namespace.name;
    const description = "Updated description";

    const environmentInfo = {
      specification: `${stringify(
        code
      )}\ndescription: ${description}\nname: ${name}\nprefix: null`,
      namespace
    };

    // createOrUpdate(environmentInfo);
    console.log(environmentInfo);

    //TODO: retrieve info from metadata description and name
    // 1. Get from EnvironmentDetailsHeader new name to update it: Ximena
    // 2. Get Description from EnvMetadata to update it: Juan
    // 4. SpecificationEdit Refactor - Types
    // 3. Refactor EnvironmentCreate
    // 5. Feedback errores
  };

  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader />
      <Box sx={{ marginBottom: "30px" }}>
        <EnvMetadata
          envDescription={selectedEnvironment?.description || ""}
          mode={mode}
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
