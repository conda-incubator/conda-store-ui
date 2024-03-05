import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { Build as IBuild } from "../../../common/models";
import { Build } from "../../../features/metadata/components";
import { buildMapper } from "../../../utils/helpers/buildMapper";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { artifactBaseUrl } from "../../../utils/helpers";
import { PrefContext } from "../../../preferences";
import artifactList from "../../../utils/helpers/artifact";
import { Artifact } from "../../../common/models";

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
  const currentBuild = envBuilds.find(build => build.id === selectedBuildId);

  // If the selected build is a failed build, we will render the link to the build log.
  let logLink;
  const showLogLink = currentBuild?.status === "Failed";
  const logArtifact: Artifact | never = artifactList(currentBuild?.id, [
    "LOGS"
  ])[0];
  if (showLogLink && logArtifact) {
    const pref = React.useContext(PrefContext);
    const url = new URL(
      logArtifact.route,
      artifactBaseUrl(pref.apiUrl, window.location.origin)
    );
    logLink = (
      <Link
        href={url.toString()}
        target="_blank"
        sx={{
          display: "inline-flex",
          verticalAlign: "bottom", // align link (icon plus link text) with non-link text on the same line
          alignItems: "center" // align icon and text within link
        }}
      >
        <OpenInNewIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Log
      </Link>
    );
  }

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
      {currentBuild ? (
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
