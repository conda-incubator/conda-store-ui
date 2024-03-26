import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Artifact, Build } from "../../../common/models";
import { PrefContext } from "../../../preferences";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import artifactList from "../../../utils/helpers/artifact";
import { artifactBaseUrl } from "../../../utils/helpers/parseArtifactList";
import { buildStatus } from "../../../utils/helpers/buildMapper";

const LogLink = ({ logArtifact }: { logArtifact: Artifact }) => {
  const pref = React.useContext(PrefContext);
  const url = new URL(
    logArtifact.route,
    artifactBaseUrl(pref.apiUrl, window.location.origin)
  );
  return (
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
};

interface IEnvBuildStatusProps {
  build: Build;
}

export const EnvBuildStatus = ({ build }: IEnvBuildStatusProps) => {
  const logArtifact: Artifact | never = artifactList(build.id, ["LOGS"])[0];

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
        {buildStatus(build)}
        {build.status_info && ` (${build.status_info})`}
        {build.status === "BUILDING" || build.status === "QUEUED" ? (
          <CircularProgress
            size={10}
            sx={{
              marginLeft: "8px"
            }}
          />
        ) : (
          // If the selected build is a failed build, render the link to the build log.
          build.status === "FAILED" &&
          logArtifact && (
            <>
              . <LogLink logArtifact={logArtifact} />
            </>
          )
        )}
      </Typography>
    </StyledMetadataItem>
  );
};
