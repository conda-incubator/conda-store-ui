import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { Build as IBuild } from "../../../common/models";
import { Build } from "../../../features/metadata/components";
import { buildMapper } from "../../../utils/helpers/buildMapper";

interface IData {
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
  const currentBuild = envBuilds.find(build => build.id === selectedBuildId);

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
      {currentBuild && (
        <>
          <Build builds={envBuilds} selectedBuildId={selectedBuildId} />
          <StyledMetadataItem
            sx={{
              marginTop: "0",
              fontSize: "13px",
              fontWeight: 500,
              paddingBottom: "0"
            }}
          >
            Status: {""}
            <Typography component="span" sx={{ fontSize: "13px" }}>
              {currentBuild.status_info ? (
                <>
                  {currentBuild.status} ({currentBuild.status_info})
                </>
              ) : (
                <>{currentBuild.status}</>
              )}
              {(currentBuild.status === "Building" ||
                currentBuild.status === "Queued") && (
                <CircularProgress
                  size={10}
                  sx={{
                    marginLeft: "8px"
                  }}
                />
              )}
            </Typography>
          </StyledMetadataItem>
        </>
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
