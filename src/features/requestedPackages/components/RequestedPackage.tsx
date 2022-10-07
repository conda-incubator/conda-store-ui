import React from "react";
import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { requestedPackageParser } from "../../../utils/helpers";

interface IRequestedPackageProps {
  /**
   * @param requestedPackage requested package
   */
  requestedPackage: string;
}

export const RequestedPackage = ({
  requestedPackage
}: IRequestedPackageProps) => {
  const { constraint, name, version } =
    requestedPackageParser(requestedPackage);

  const displayConstraint = () => {
    if (constraint === "latest") {
      return "";
    }

    return `${constraint}${version}`;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SquareIcon
          sx={{ color: "#000", width: 10, height: 10, marginRight: "12px" }}
        />
        <Typography sx={{ width: 190 }}>{name}</Typography>
      </Box>
      <Typography>{displayConstraint()}</Typography>
    </Box>
  );
};
