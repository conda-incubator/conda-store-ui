import { Box, TableRow, Typography } from "@mui/material";
import React from "react";
import { ConstraintSelect, VersionSelect } from "../../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledIconButton,
  StyledRequestedPackagesTableCell
} from "../../../styles";
import { requestedPackageParser } from "../../../utils/helpers";

interface IProps {
  /**
   * @param requestedPackage requested package
   * @param onRemove handler that will run when delete icon is clicked
   * @param handleUpdate handler that will run when a package is updated
   */
  requestedPackage: string;
  onRemove: (packageName: string) => void;
  handleUpdate: (currentPackage: string, updatedPackage: string) => void;
}

export const CreateEnvironmentPackagesTableRow = ({
  requestedPackage,
  onRemove,
  handleUpdate
}: IProps) => {
  const { version, constraint, name } =
    requestedPackageParser(requestedPackage);

  const handleUpdateConstraint = (value: string) => {
    const updatedPackage = `${name}${value}${version}`;

    handleUpdate(requestedPackage, updatedPackage);
  };

  const handleUpdateVersion = (value: string) => {
    const updatedPackage = `${name}${
      constraint === "latest" ? ">=" : constraint
    }${value}`;

    handleUpdate(requestedPackage, updatedPackage);
  };

  return (
    <TableRow>
      <StyledRequestedPackagesTableCell align="left">
        <Typography sx={{ fontSize: "16px", fontWeight: 400, color: "#000" }}>
          {name}
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell align="left">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ConstraintSelect
            onUpdate={handleUpdateConstraint}
            constraint={constraint === "latest" ? "" : constraint}
          />
          <VersionSelect
            onUpdate={handleUpdateVersion}
            version={constraint === "latest" ? "" : version}
            name={name}
          />
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
