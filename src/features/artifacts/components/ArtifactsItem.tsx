import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import React from "react";

import { Artifact } from "../../../common/models";
import { PrefContext } from "../../../preferences";

interface IArtifactsProps {
  /**
   * @param artifact type with the name and route properties
   */
  artifact: Artifact;
}

export const ArtifactItem = ({ artifact }: IArtifactsProps) => {
  const pref = React.useContext(PrefContext);
  const route = new URL(artifact.route, pref.apiUrl).toString();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link
        href={route}
        underline="none"
        sx={{ color: "#454545", fontSize: "13px" }}
        target="_blank"
      >
        {artifact.name}
      </Link>
    </Box>
  );
};
