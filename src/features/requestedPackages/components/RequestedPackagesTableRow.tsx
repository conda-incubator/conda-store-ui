import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { memo } from "react";
import {
  ConstraintSelect,
  DeleteIconAlt,
  VersionSelect
} from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  StyledIconButton,
  StyledRequestedPackagesTableCell
} from "../../../styles";
import { requestedPackageParser } from "../../../utils/helpers";
import {
  requestedPackageRemoved,
  requestedPackageUpdated
} from "../../environmentCreate/environmentCreateSlice";

interface IRequestedPackagesTableRowProps {
  /**
   * @param requestedPackage requested package
   */
  environmentName: string;
  namespaceName: string;
  requestedPackage: string;
  onDefaultEnvIsChanged?: (isChanged: boolean) => void;
}

const BaseRequestedPackagesTableRow = ({
  environmentName,
  namespaceName,
  requestedPackage,
  onDefaultEnvIsChanged
}: IRequestedPackagesTableRowProps) => {
  const dispatch = useAppDispatch();
  const { versionsWithoutConstraints, versionsWithConstraints } =
    useAppSelector(state => state.requestedPackages);
  const result = requestedPackageParser(requestedPackage);
  let { version } = result;
  const { constraint, name } = result;

  if (constraint === "latest") {
    version = versionsWithoutConstraints[name];
  }

  const onUpdateDefaultEnvironment = (isChanged: boolean) => {
    if (onDefaultEnvIsChanged) {
      onDefaultEnvIsChanged(isChanged);
    }
  };

  const updateVersion = (value: string) => {
    let pkgConstraint = constraint === "latest" ? ">=" : constraint;

    if (value === "") {
      pkgConstraint = "";
    }

    const updatedPackage = `${name}${pkgConstraint}${value}`;

    dispatch(
      requestedPackageUpdated([
        `${namespaceName}/${environmentName}`,
        { currentPackage: requestedPackage, updatedPackage }
      ])
    );
    onUpdateDefaultEnvironment(false);
  };

  const updateConstraint = (value: string) => {
    const updatedPackage = `${name}${value}${version ? version : ""}`;

    dispatch(
      requestedPackageUpdated([
        `${namespaceName}/${environmentName}`,
        { currentPackage: requestedPackage, updatedPackage }
      ])
    );
    onUpdateDefaultEnvironment(false);
  };

  const handleRemove = () => {
    console.log(
      "removing package",
      `${namespaceName}/${environmentName}`,
      requestedPackage
    );
    dispatch(
      requestedPackageRemoved([
        `${namespaceName}/${environmentName}`,
        requestedPackage
      ])
    );
    onUpdateDefaultEnvironment(false);
  };

  return (
    <TableRow>
      <StyledRequestedPackagesTableCell align="left">
        <Typography sx={{ fontSize: "13px", fontWeight: 400, color: "#000" }}>
          {name}
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell align="left">
        <Typography
          sx={{ fontSize: "13px", fontWeight: 400, color: "#676666" }}
        >
          {versionsWithConstraints[name] ?? versionsWithoutConstraints[name]}
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
          <StyledIconButton
            onClick={handleRemove}
            sx={{ marginLeft: "24px" }}
            data-testid="RemovePackageTest"
          >
            <DeleteIconAlt />
          </StyledIconButton>
        </Box>
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

export const RequestedPackagesTableRow = memo(BaseRequestedPackagesTableRow);
