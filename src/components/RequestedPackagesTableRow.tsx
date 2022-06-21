import React from "react";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import requestedPackageParser from "src/utils/helpers/requestedPackageParser";
import StyledRequestedPackagesTableCell from "src/styles/StyledRequestedPackagesTableCell";

interface IRequestedPackagesTableRowProps {
  requestedPackage: string;
}

const RequestedPackagesTableRow = ({
  requestedPackage,
}: IRequestedPackagesTableRowProps) => {
  const { name, version, constraint } =
    requestedPackageParser(requestedPackage);

  return (
    <TableRow>
      <StyledRequestedPackagesTableCell align="left">
        <Typography sx={{ fontSize: "16px", fontWeight: 400, color: "#000" }}>
          {name}
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell align="left">
        <Typography
          sx={{ fontSize: "16px", fontWeight: 400, color: "#676666" }}
        >
          {version}
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell align="left">
        {constraint} {version}
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export default RequestedPackagesTableRow;
