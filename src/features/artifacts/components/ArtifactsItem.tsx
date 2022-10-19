import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import React from "react";
import { config } from "../../../common/constants";
import { Artifact } from "../../../common/models";
import { getStylesForStyleType } from "../../../utils/helpers";

interface IArtifactsProps {
  /**
   * @param artifact type with the name and route properties
   */
  artifact: Artifact;
}

export const ArtifactItem = ({ artifact }: IArtifactsProps) => {
  const isGrayscaleStyleType = config.styleType === "grayscale";

  const linkStyles = getStylesForStyleType(
    { color: "#000" },
    { color: "#3C4043", fontSize: "14px", fontWeight: 400 }
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isGrayscaleStyleType && (
        <SquareIcon
          sx={{
            color: "#000",
            width: 10,
            height: 10,
            marginRight: "12px"
          }}
        />
      )}
      <Link href={artifact.route} underline="none" sx={linkStyles}>
        {artifact.name}
      </Link>
    </Box>
  );
};
