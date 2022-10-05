import React from "react";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import { StyledRequestedPackagesTableCell, StyledIconButton } from "../../../styles";
import { ConstraintSelect, VersionSelect } from "../../../components";
import { requestedPackageParser } from "../../../utils/helpers";
import { useAppSelector } from "../../../hooks";

interface IRequestedPackagesTableRowProps {
  /**
   * @param requestedPackage requested package
   * @param onRemove handler that will run when delete icon is clicked
   * @param isCreating notify the component if it's being used for creating or editing environment
   */
  requestedPackage: string;
  onRemove: (packageName: string) => void;
  onUpdate?: (name: string, constraint: string, version: string) => void;
  isCreating: boolean;
}

export const RequestedPackagesTableRow = ({
  requestedPackage,
  onRemove,
  onUpdate = (name: string, constraint: string, version: string) => {},
  isCreating
}: IRequestedPackagesTableRowProps) => {
  const { packageVersions } = useAppSelector(state => state.requestedPackages);

  const result = requestedPackageParser(requestedPackage);
  let { version } = result;
  const { constraint, name } = result;

  if (constraint === "latest") {
    version = packageVersions[name];
  }

  const updateVersion = (value: string) => {
    onUpdate(name, constraint, value);
  };

  const updateConstraint = (value: string) => {
    onUpdate(name, value, version);
  };

  return (
    <TableRow>
      <StyledRequestedPackagesTableCell align="left">
        <Typography sx={{ fontSize: "16px", fontWeight: 400, color: "#000" }}>
          {name}
        </Typography>
      </StyledRequestedPackagesTableCell>
      {!isCreating && (
        <StyledRequestedPackagesTableCell align="left">
          <Typography
            sx={{ fontSize: "16px", fontWeight: 400, color: "#676666" }}
          >
            {version}
          </Typography>
        </StyledRequestedPackagesTableCell>
      )}
      <StyledRequestedPackagesTableCell align="left">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ConstraintSelect
            onUpdate={updateConstraint}
            constraint={constraint === "latest" ? "" : constraint}
          />
          <VersionSelect
            onUpdate={updateVersion}
            version={version}
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
