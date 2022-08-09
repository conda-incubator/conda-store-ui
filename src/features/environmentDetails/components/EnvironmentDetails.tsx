import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "src/hooks";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { Specification } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useGetBuildPackagesQuery } from "src/features/dependencies";
import { ArtifactsList } from "src/features/artifacts";

export const EnvironmentDetails = () => {
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { page } = useAppSelector(state => state.dependencies);
  const { selectedEnvironment } = useAppSelector(state => state.tabs);

  if (selectedEnvironment) {
    useGetBuildQuery(selectedEnvironment.current_build_id);
    useGetBuildPackagesQuery({
      buildId: selectedEnvironment.current_build_id,
      page,
      size: 50
    });
  }

  const artifactList = [
    {
      name: "Link to lockfile",
      route: "/api/v1/build/1/lockfile/"
    },
    {
      name: "Link to yml file",
      route: "/api/v1/build/1/yaml/"
    },
    {
      name: "Link to archive",
      route: "/api/v1/build/1/archive/"
    },
    {
      name: "Conda Env 1 log",
      route: "/api/v1/build/1/logs"
    }
  ];

  // replace <Typography>Environment Metadata</Typography> part with actual environment metadata component when it's done
  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader />
      <Box sx={{ marginBottom: "30px" }}>
        <Typography>Environment Metadata</Typography>
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <Specification />
      </Box>
      {mode === "read-only" && (
        <Box>
          <ArtifactsList artifacts={artifactList} />
        </Box>
      )}
    </Box>
  );
};
