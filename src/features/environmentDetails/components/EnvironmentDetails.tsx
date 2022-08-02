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

  useGetBuildQuery(1); //replace this number with redux state when we implement that part
  useGetBuildPackagesQuery({ buildId: 1, page, size: 100 }); //replace buildId with redux state when we implement that pa

  const artifactsList = [
    //replace {build_id} with redux value when we implement that logic
    {
      name: "Link to lockfile",
      route: "/api/v1/build/{build_id}/lockfile/"
    },
    {
      name: "Link to yml file",
      route: "/api/v1/build/{build_id}/yaml/"
    },
    {
      name: "Link to archive",
      route: "/api/v1/build/{build_id}/archive/"
    },
    {
      name: "Conda Env {build_id} log",
      route: "/api/v1/build/{build_id}/logs"
    }
  ];

  // replace <Typography>Environment Metadata</Typography> part with actual environment metadata component when it's done
  return (
    <Box sx={{ border: "1px solid #000", padding: "18px 12px" }}>
      <EnvironmentDetailsHeader />
      <Box sx={{ marginBottom: "30px" }}>
        <Typography>Environment Metadata</Typography>
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <Specification />
      </Box>
      {mode === "read-only" && (
        <Box>
          <ArtifactsList artifacts={artifactsList} />
        </Box>
      )}
    </Box>
  );
};
