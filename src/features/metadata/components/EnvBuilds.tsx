import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { Build as IBuild } from "../../../common/models";
import { BuildDropdown } from "../../../features/metadata/components";
import { buildMapper } from "../../../utils/helpers/buildMapper";
import { EnvBuildStatus } from "./EnvBuildStatus";

export interface IData {
  currentBuildId: number;
  selectedBuildId: number;
  builds: IBuild[];
  mode: "create" | "read-only" | "edit";
}

export const EnvBuilds = ({
  currentBuildId,
  selectedBuildId,
  builds,
  mode
}: IData) => {
  const envBuilds = builds.length ? buildMapper(builds, currentBuildId) : [];
  const selectedBuild = envBuilds.find(build => build.id === selectedBuildId);
  return (
    <>
      <StyledMetadataItem
        sx={{
          fontWeight: 500,
          paddingBottom: "5px"
        }}
      >
        {mode === "edit" ? "Change active environment version:" : "Builds:"}
      </StyledMetadataItem>
      {selectedBuild ? (
        <>
          <BuildDropdown builds={envBuilds} selectedBuildId={selectedBuildId} />
          <EnvBuildStatus build={selectedBuild} />
        </>
      ) : (
        <CircularProgress
          size={20}
          sx={{ marginLeft: "15px", marginTop: "6px", marginBottom: "7px" }}
        />
      )}
    </>
  );
};
