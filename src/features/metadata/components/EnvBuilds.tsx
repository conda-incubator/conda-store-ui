import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { Build } from "../../../features/metadata/components";
import { buildMapper } from "../../../utils/helpers/buildMapper";
import { useAppSelector } from "../../../hooks";

interface IData {
  currentBuildId: number;
  selectedBuildId: number;
}

export const EnvBuilds = ({ currentBuildId, selectedBuildId }: IData) => {
  const { builds } = useAppSelector(state => state.enviroments);
  const envBuilds = builds.length ? buildMapper(builds, currentBuildId) : [];
  const currentBuild = envBuilds.find(build => build.id === currentBuildId);

  return (
    <>
      <StyledMetadataItem
        sx={{
          fontWeight: 500,
          paddingBottom: "5px"
        }}
      >
        Builds:
      </StyledMetadataItem>
      {currentBuild && (
        <Build
          builds={envBuilds}
          currentBuildStatus={currentBuild.status}
          selectedBuildId={selectedBuildId}
        />
      )}
      {!currentBuild && (
        <CircularProgress
          size={20}
          sx={{ marginLeft: "15px", marginTop: "6px", marginBottom: "7px" }}
        />
      )}
    </>
  );
};
