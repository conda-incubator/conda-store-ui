import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { memo } from "react";
import { ConstraintSelect, VersionSelect } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  StyledIconButton,
  StyledRequestedPackagesTableCell
} from "../../../styles";
import { requestedPackageParser } from "../../../utils/helpers";
import { packageRemoved, packageUpdated } from "../requestedPackagesSlice";

interface IRequestedPackagesTableRowProps {
  /**
   * @param requestedPackage requested package
   */
  requestedPackage: string;
}

const BaseRequestedPackagesTableRow = ({
  requestedPackage
}: IRequestedPackagesTableRowProps) => {
  const dispatch = useAppDispatch();
  const { packageVersions } = useAppSelector(state => state.requestedPackages);
  const { installedVersions } = useAppSelector(
    state => state.environmentDetails
  );
  const result = requestedPackageParser(requestedPackage);
  let { version } = result;
  const { constraint, name } = result;

  if (constraint === "latest") {
    version = packageVersions[name];
  }

  const updateVersion = (value: string) => {
    let pkgConstraint = constraint === "latest" ? ">=" : constraint;

    if (value === "") {
      pkgConstraint = "";
    }

    const updatedPackage = `${name}${pkgConstraint}${value}`;

    dispatch(
      packageUpdated({ currentPackage: requestedPackage, updatedPackage })
    );
  };

  const updateConstraint = (value: string) => {
    const updatedPackage = `${name}${value}${version}`;

    dispatch(
      packageUpdated({ currentPackage: requestedPackage, updatedPackage })
    );
  };

  const handleRemove = () => dispatch(packageRemoved(requestedPackage));

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
          {installedVersions[name]}
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell align="left">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ConstraintSelect
            onUpdate={updateConstraint}
            constraint={constraint === "latest" ? "" : constraint}
          />
          <VersionSelect
            onUpdate={updateVersion}
            version={constraint === "latest" ? "" : version}
            name={name}
          />
          <StyledIconButton onClick={handleRemove} sx={{ marginLeft: "24px" }}>
            <DeleteIcon />
          </StyledIconButton>
        </Box>
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export const RequestedPackagesTableRow = memo(BaseRequestedPackagesTableRow);
