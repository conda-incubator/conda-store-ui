import React from "react";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import requestedPackageParser from "src/utils/helpers/requestedPackageParser";
import StyledRequestedPackagesTableCell from "src/styles/StyledRequestedPackagesTableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import StyledIconButton from "../../styles/StyledIconButton";
import ConstraintSelect from "../ConstraintSelect";
import VersionSelect from "../VersionSelect";

interface IRequestedPackagesTableRowProps {
  requestedPackage: string;
  onRemove: (packageName: string) => void;
}

const RequestedPackagesTableRow = ({
  requestedPackage,
  onRemove
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
          <ConstraintSelect constraint={constraint} />
          <VersionSelect version={version} />
          <StyledIconButton
            onClick={() => onRemove(requestedPackage)}
            sx={{ marginLeft: "24px" }}
          >
            <DeleteIcon />
          </StyledIconButton>
        </Box>
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export default RequestedPackagesTableRow;
