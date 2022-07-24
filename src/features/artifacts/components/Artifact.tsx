import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import React from "react";
import { Artifacts } from "src/common/models";

interface IArtifactsProps {
  /**
   * TODO: this interface needs a docstring for each param
   */
  linkOption: Artifacts;
}

export const Artifact = ({ linkOption }: IArtifactsProps) => {
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
      <Link href={linkOption.route} underline="none" sx={{ color: "#000" }}>
        {linkOption.name}
      </Link>
    </Box>
  );
};
