import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

import { requestedPackageParser } from "src/utils/helpers/requestedPackageParser";

interface IRequestedPackageProps {
  /**
   * @param requestedPackage requested package
   */
  requestedPackage: string;
}

export const RequestedPackage = ({
  requestedPackage
}: IRequestedPackageProps) => {
  const { name, version, constraint } =
    requestedPackageParser(requestedPackage);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SquareIcon
          sx={{ color: "#000", width: 10, height: 10, marginRight: "12px" }}
        />
        <Typography sx={{ width: 190 }}>
          {name} {version}
        </Typography>
      </Box>
      <Typography>
        {constraint} {version}
      </Typography>
    </Box>
  );
};
