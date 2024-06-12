import Accordion from "@mui/material/Accordion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useMemo } from "react";
import { RequestedPackage } from ".";
import { CondaSpecificationPip } from "../../../common/models";
import { ArrowIcon } from "../../../components";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "../../../styles";

export interface IRequestedPackageListProps {
  /**
   * @param packageList list of packages that we get from the API
   */
  packageList: (string | CondaSpecificationPip)[];
}

export const RequestedPackageList = ({
  packageList
}: IRequestedPackageListProps) => {
  const filteredPackageList = useMemo(
    () => packageList.filter(item => typeof item !== "object"),
    [packageList]
  );
  const listLength = filteredPackageList.length;

  return (
    <Accordion
      sx={{
        maxWidth: 420,
        boxShadow: "none"
      }}
      disableGutters
      defaultExpanded
    >
      <StyledAccordionSummary expandIcon={<ArrowIcon />}>
        <StyledAccordionTitle sx={{ color: "primary.main" }}>
          Requested Packages
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ padding: 0 }}>
        <TableContainer>
          <Table sx={{ width: "420px", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "13px" }}>Package</TableCell>
                <TableCell sx={{ fontSize: "13px", textAlign: "right" }}>
                  Requested Version
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPackageList.map((item, index) => (
                <TableRow
                  key={String(item)}
                  sx={{
                    backgroundColor: index % 2 ? "secondary.50" : "transparent"
                  }}
                >
                  <RequestedPackage
                    requestedPackage={String(item)}
                    isLast={index === listLength - 1}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledAccordionDetails>
    </Accordion>
  );
};
