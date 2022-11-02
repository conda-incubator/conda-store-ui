import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import React from "react";
import { Artifact } from "../../../common/models";
import { getStylesForStyleType } from "../../../utils/helpers";

interface IArtifactsProps {
  /**
   * @param artifact type with the name and route properties
   */
  artifact: Artifact;
}

export const ArtifactItem = ({ artifact }: IArtifactsProps) => {
  const linkStyles = getStylesForStyleType(
    { color: "#000", fontSize: "14px" },
    { color: "#3C4043", fontSize: "14px", fontWeight: 400 }
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link href={artifact.route} underline="none" sx={linkStyles}>
        {artifact.name}
      </Link>
    </Box>
  );
};
