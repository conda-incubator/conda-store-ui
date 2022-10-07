import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import React from "react";
import { Artifact } from "../../../common/models";

interface IArtifactsProps {
  /**
   * @param artifact type with the name and route properties
   */
  artifact: Artifact;
}

export const ArtifactItem = ({ artifact }: IArtifactsProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <SquareIcon
        sx={{
          color: "#000",
          width: 10,
          height: 10,
          marginRight: "12px"
        }}
      />
      <Link href={artifact.route} underline="none" sx={{ color: "#000" }}>
        {artifact.name}
      </Link>
    </Box>
  );
};
