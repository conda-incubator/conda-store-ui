import React from "react";
import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  getStylesForStyleType,
  requestedPackageParser
} from "../../../utils/helpers";
import { config } from "../../../common/constants";

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
  const isGrayscaleStyleType = config.styleType === "grayscale";

  const packageNameStyles = getStylesForStyleType(
    { width: 190 },
    { width: 190, fontSize: "14px", color: "#3C4043" }
  );

  const constraintStyles = getStylesForStyleType(
    {},
    { fontSize: "14px", color: "#3C4043" }
  );

  const displayConstraint = () => {
    if (constraint === "latest") {
      return "";
    }

    return `${constraint}${version}`;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isGrayscaleStyleType && (
          <SquareIcon
            sx={{ color: "#000", width: 10, height: 10, marginRight: "12px" }}
          />
        )}
        <Typography sx={packageNameStyles}>{name}</Typography>
      </Box>
      <Typography sx={constraintStyles}>{displayConstraint()}</Typography>
    </Box>
  );
};
