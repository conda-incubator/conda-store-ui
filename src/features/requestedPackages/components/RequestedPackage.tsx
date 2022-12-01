import React from "react";
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
    const newConstraint = constraint === "==" ? "=" : constraint;
    return `${newConstraint}${version}`;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ width: 190, fontSize: "13px", color: "#454545" }}>
          {name}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "13px", color: "#454545" }}>
        {displayConstraint()}
      </Typography>
    </Box>
  );
};
