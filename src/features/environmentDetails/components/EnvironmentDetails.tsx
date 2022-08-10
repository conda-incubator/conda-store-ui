import React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "src/hooks";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { Specification } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useGetBuildPackagesQuery } from "src/features/dependencies";
import { ArtifactsList } from "src/features/artifacts";
import { EnvMetadata } from "src/features/metadata";
import { buildMapper } from "src/utils/helpers";

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

  const buildData = {
    status: "ok",
    data: [
      {
        id: 2,
        environment_id: 2,
        specification: null,
        packages: null,
        status: "COMPLETED",
        size: 315875085,
        scheduled_on: "2022-07-14T12:38:42.932219",
        started_on: "2022-07-14T12:38:44.116409",
        ended_on: "2022-07-14T12:39:48.185573",
        build_artifacts: null
      },
      {
        id: 3,
        environment_id: 2,
        specification: null,
        packages: null,
        status: "COMPLETED",
        size: 315875075,
        scheduled_on: "2022-07-14T12:40:38.095584",
        started_on: "2022-07-14T12:40:38.330526",
        ended_on: "2022-07-14T12:41:33.092302",
        build_artifacts: null
      }
    ],
    message: null,
    page: 1,
    size: 100,
    count: 2
  };

  return (
    <Box sx={{ padding: "14px 12px" }}>
      <EnvironmentDetailsHeader />
      <Box sx={{ marginBottom: "30px" }}>
        <EnvMetadata builds={buildMapper(buildData)} />
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
