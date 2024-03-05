import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { artifactBaseUrl } from "../../../utils/helpers";
import { PrefContext } from "../../../preferences";
import artifactList from "../../../utils/helpers/artifact";
import { Artifact } from "../../../common/models";
import { buildMapper } from "../../../utils/helpers/buildMapper";

interface IEnvBuildStatusProps {
  // The build object here is a reduced and slightly modified version of the
  // object described in common/models/Build.
  build: ReturnType<typeof buildMapper>[0];
}

export const EnvBuildStatus = ({ build }: IEnvBuildStatusProps) => {
  // If the selected build is a failed build, we will render the link to the build log.
  let logLink;
  const showLogLink = build.status === "Failed";
  const logArtifact: Artifact | never = artifactList(build.id, ["LOGS"])[0];
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
        {build.status}
        {build.status_info && ` (${build.status_info})`}
        {((build.status === "Building" || build.status === "Queued") && (
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
  );
};
