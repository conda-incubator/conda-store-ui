import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { Build } from "../../../features/metadata/components";
import { buildMapper } from "../../../utils/helpers/buildMapper";
import { useAppSelector } from "../../../hooks";

interface IData {
  currentBuildId: number;
}

export const EnvBuilds = ({ currentBuildId }: IData) => {
  const { builds } = useAppSelector(state => state.enviroments);
  const envBuilds = builds.length ? buildMapper(builds, currentBuildId) : [];
  const currentBuild = envBuilds.find(build => build.id === currentBuildId);

  return (
    <>
      <StyledMetadataItem>
        <b>Build</b>
      </StyledMetadataItem>
      {currentBuild && (
        <Build
          builds={envBuilds}
          currentBuildId={currentBuild.id}
          currentBuildStatus={currentBuild.status}
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
