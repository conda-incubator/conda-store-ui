import React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "src/hooks";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { Specification } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useGetBuildPackagesQuery } from "src/features/dependencies";
import { ArtifactList } from "src/features/artifacts";
import { EnvMetadata } from "src/features/metadata";

export const EnvironmentDetails = () => {
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { page } = useAppSelector(state => state.dependencies);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);

  if (selectedEnvironment) {
    useGetBuildQuery(selectedEnvironment.current_build_id);
    useGetBuildPackagesQuery({
      buildId: selectedEnvironment.current_build_id,
      page,
      size: 100
    });
  }

  const artifactList = [
    {
      name: "Link to lockfile",
      route: `/api/v1/build/${selectedEnvironment?.id}/lockfile/`
    },
    {
      name: "Link to yml file",
      route: `/api/v1/build/${selectedEnvironment?.id}/yaml/`
    },
    {
      name: "Link to archive",
      route: `/api/v1/build/${selectedEnvironment?.id}/archive/`
    },
    {
      name: `Conda Env ${selectedEnvironment?.id} log`,
      route: `/api/v1/build/${selectedEnvironment?.id}/logs`
    }
  ];

  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader />
      <Box sx={{ marginBottom: "30px" }}>
        <EnvMetadata />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <Specification />
      </Box>
      {mode === "read-only" && (
        <Box>
          <ArtifactList artifacts={artifactList} />
        </Box>
      )}
    </Box>
  );
};
