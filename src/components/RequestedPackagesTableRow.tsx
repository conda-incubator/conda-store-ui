import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import requestedPackageParser from "src/utils/helpers/requestedPackageParser";

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
      <TableCell
        align="left"
        sx={{ paddingLeft: "0px", borderBottom: "0px", paddingBottom: "10px" }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 400, color: "#000" }}>
          {name}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        sx={{ paddingLeft: "0px", borderBottom: "0px", paddingBottom: "10px" }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: 400, color: "#676666" }}
        >
          {version}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        sx={{ paddingLeft: "0px", borderBottom: "0px", paddingBottom: "10px" }}
      >
        {constraint} {version}
      </TableCell>
    </TableRow>
  );
};

export default RequestedPackagesTableRow;
