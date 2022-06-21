import React from "react";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import requestedPackageParser from "src/utils/helpers/requestedPackageParser";
import StyledRequestedPackagesTableCell from "src/styles/StyledRequestedPackagesTableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#000",
              width: "100px",
            }}
          >
            {constraint} {version}
          </Typography>
          <DeleteIcon />
        </Box>
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export default RequestedPackagesTableRow;
