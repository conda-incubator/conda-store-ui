import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import React from "react";

import { Artifact } from "../../../common/models";
import { PrefContext } from "../../../preferences";
import { isPathAbsolute } from "../../../utils/helpers";

interface IArtifactsProps {
  /**
   * @param artifact type with the name and route properties
   */
  artifact: Artifact;
}

export const ArtifactItem = ({ artifact }: IArtifactsProps) => {
  const pref = React.useContext(PrefContext);
  const url = isPathAbsolute(pref.apiUrl)
    ? pref.apiUrl
    : `${window.location.origin}${pref.apiUrl}`;
  const route = new URL(artifact.route, url).toString();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link
        href={route}
        underline="none"
        sx={{ color: "#333", fontSize: "13px" }}
        target="_blank"
      >
        {artifact.name}
      </Link>
    </Box>
  );
};
