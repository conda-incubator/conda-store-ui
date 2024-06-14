import React, { useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { RequestedPackagesTableRow } from "./RequestedPackagesTableRow";
import { AddRequestedPackage } from "./AddRequestedPackage";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledButton
} from "../../../styles";
import { CondaSpecificationPip } from "../../../common/models";
import { useAppDispatch } from "../../../hooks";
import { packageAdded } from "../requestedPackagesSlice";
import { ArrowIcon } from "../../../components";

export interface IRequestedPackagesEditProps {
  /**
   * @param packageList list of packages that we get from the API
   */
  packageList: (string | CondaSpecificationPip)[];
  onDefaultEnvIsChanged?: (isChanged: boolean) => void;
}

export const RequestedPackagesEdit = ({
  packageList,
  onDefaultEnvIsChanged
}: IRequestedPackagesEditProps) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const { palette } = useTheme();

  const handleSubmit = (packageName: string) => {
    dispatch(packageAdded(packageName));
    if (onDefaultEnvIsChanged) {
      onUpdateDefaultEnvironment(false);
    }
  };

  const onUpdateDefaultEnvironment = (isChanged: boolean) => {
    if (onDefaultEnvIsChanged) {
      onDefaultEnvIsChanged(isChanged);
    }
  };

  const filteredPackageList = useMemo(
    () => packageList.filter(item => typeof item !== "object") as string[],
    [packageList]
  );

  return (
    <Accordion
      sx={{ maxWidth: 500, boxShadow: "none" }}
      defaultExpanded
      disableGutters
    >
      <StyledAccordionSummary expandIcon={<ArrowIcon />}>
        <StyledAccordionTitle sx={{ color: "primary.main" }}>
          Requested Packages
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{
          borderRadius: "0px",
          padding: 0
        }}
      >
        <TableContainer>
          <Table aria-label="requested packages">
            <TableHead sx={{ border: "none" }}>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    width: "120px"
                  }}
                >
                  <Typography
                    component="p"
                    sx={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    component="p"
                    sx={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    Version Constraint
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: "180px"
                  }}
                >
                  <Typography
                    component="p"
                    sx={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    Installed Version
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPackageList.map((requestedPackage, index) => (
                <RequestedPackagesTableRow
                  key={requestedPackage}
                  requestedPackage={requestedPackage}
                  onDefaultEnvIsChanged={onUpdateDefaultEnvironment}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isAdding && (
          <Box
            sx={{
              padding: "0 0 16px 16px"
            }}
          >
            <AddRequestedPackage
              onSubmit={handleSubmit}
              onCancel={setIsAdding}
              isCreating={false}
            />
          </Box>
        )}
      </StyledAccordionDetails>
      <AccordionDetails
        sx={{
          border: `1px solid ${palette.secondary.light}`,
          borderTop: "0px",
          borderRadius: "0px",
          padding: "15px 21px",
          display: "flex",
          justifyContent: "flex-start"
        }}
      >
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={() => setIsAdding(true)}
        >
          + Add Package
        </StyledButton>
      </AccordionDetails>
    </Accordion>
  );
};
