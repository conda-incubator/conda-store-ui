import SquareIcon from "@mui/icons-material/Square";
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
  const route = (new URL(artifact.route, pref.apiUrl)).toString();
  
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
      <Link href={route} underline="none" sx={{ color: "#000" }}>
        {artifact.name}
      </Link>
    </Box>
  );
};
