import React from "react";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import { requestedPackageParser } from "../../../utils/helpers";
interface IRequestedPackageProps {
  /**
   * @param requestedPackage requested package
   */
  requestedPackage: string;
  isLast: boolean;
}

export const RequestedPackage = ({
  requestedPackage,
  isLast
}: IRequestedPackageProps) => {
  const { constraint, name, version } =
    requestedPackageParser(requestedPackage);

  return (
    <>
      <TableCell
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: isLast ? "none" : undefined
        }}
      >
        <Typography
          sx={{
            width: 190,
            fontSize: "13px",
            color: "#333"
          }}
        >
          {name}
        </Typography>
      </TableCell>
      <TableCell
        sx={{ textAlign: "right", borderBottom: isLast ? "none" : undefined }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            color: "#333",
            fontStyle: constraint === "latest" ? "italic" : "normal"
          }}
        >
          {constraint === "latest"
            ? "(no version requested)"
            : `${constraint.replace("==", "=")}${version}`}
        </Typography>
      </TableCell>
    </>
  );
};
