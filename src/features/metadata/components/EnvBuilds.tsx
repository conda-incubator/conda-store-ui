import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { Build as IBuild } from "../../../common/models";
import { BuildDropdown } from "../../../features/metadata/components";
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
  const selectedBuild = builds.find(build => build.id === selectedBuildId);
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
          <Build builds={envBuilds} selectedBuildId={selectedBuildId} />
          <StyledMetadataItem
            sx={{
              marginTop: "0",
              fontSize: "13px",
              fontWeight: 500,
              paddingBottom: "0"
            }}
            data-testid="build-status"
          >
            Status: {""}
            <Typography component="span" sx={{ fontSize: "13px" }}>
              {currentBuild.status}
              {currentBuild.status_info && ` (${currentBuild.status_info})`}
              {((currentBuild.status === "Building" ||
                currentBuild.status === "Queued") && (
                <CircularProgress
                  size={10}
                  sx={{
                    marginLeft: "8px"
                  }}
                />
              )) ||
                // If the selected build is a failed build, render the link to the build log.
                (showLogLink && <>. {logLink}</>)}
            </Typography>
          </StyledMetadataItem>
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
