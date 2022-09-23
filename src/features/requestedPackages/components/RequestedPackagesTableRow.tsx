import React, { memo } from "react";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import { StyledRequestedPackagesTableCell, StyledIconButton } from "src/styles";
import { ConstraintSelect, VersionSelect } from "src/components";
import { requestedPackageParser } from "src/utils/helpers";
import { useAppSelector } from "src/hooks";

interface IRequestedPackagesTableRowProps {
  /**
   * @param requestedPackage requested package
   * @param onRemove handler that will run when delete icon is clicked
   */
  requestedPackage: string;
  onRemove: (packageName: string) => void;
}

const BaseRequestedPackagesTableRow = ({
  requestedPackage,
  onRemove
}: IRequestedPackagesTableRowProps) => {
  const { packageVersions } = useAppSelector(state => state.requestedPackages);

  const result = requestedPackageParser(requestedPackage);
  let { version } = result;
  const { constraint, name } = result;

  if (constraint === "latest") {
    version = packageVersions[name];
  }

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
          <ConstraintSelect
            constraint={constraint === "latest" ? "" : constraint}
          />
          <VersionSelect version={version} name={name} />
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

const compareProps = (
  prevProps: IRequestedPackagesTableRowProps,
  nextProps: IRequestedPackagesTableRowProps
) => {
  return prevProps.requestedPackage === nextProps.requestedPackage;
};

// memoize the component, rerender only when requestedPackage prop has changed
export const RequestedPackagesTableRow = memo(
  BaseRequestedPackagesTableRow,
  compareProps
);
