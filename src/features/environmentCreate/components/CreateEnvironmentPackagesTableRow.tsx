import React, { memo } from "react";
import { Box, TableRow, Typography } from "@mui/material";
import { ConstraintSelect, VersionSelect } from "../../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledIconButton,
  StyledRequestedPackagesTableCell
} from "../../../styles";
import { requestedPackageParser } from "../../../utils/helpers";
import { useAppDispatch } from "../../../hooks";
import {
  requestedPackageRemoved,
  requestedPackageUpdated
} from "../environmentCreateSlice";

interface IProps {
  /**
   * @param requestedPackage requested package
   */
  requestedPackage: string;
}

const BaseCreateEnvironmentPackagesTableRow = ({
  requestedPackage
}: IProps) => {
  const dispatch = useAppDispatch();
  const { version, constraint, name } =
    requestedPackageParser(requestedPackage);

  const handleUpdateConstraint = (value: string) => {
    const updatedPackage = `${name}${value}${version}`;

    dispatch(
      requestedPackageUpdated({
        currentPackage: requestedPackage,
        updatedPackage
      })
    );
  };

  const handleUpdateVersion = (value: string) => {
    let pkgConstraint = constraint === "latest" ? ">=" : constraint;

    if (value === "") {
      pkgConstraint = "";
    }

    const updatedPackage = `${name}${pkgConstraint}${value}`;

    dispatch(
      requestedPackageUpdated({
        currentPackage: requestedPackage,
        updatedPackage
      })
    );
  };

  const handleRemovePackage = (requestedPackage: string) => {
    dispatch(requestedPackageRemoved(requestedPackage));
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
            onClick={() => handleRemovePackage(requestedPackage)}
            sx={{ marginLeft: "24px" }}
          >
            <DeleteIcon />
          </StyledIconButton>
        </Box>
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export const CreateEnvironmentPackagesTableRow = memo(
  BaseCreateEnvironmentPackagesTableRow
);
