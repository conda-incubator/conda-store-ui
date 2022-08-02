import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { RequestedPackagesTableRow } from "./RequestedPackagesTableRow";
import { AddRequestedPackage } from "./AddRequestedPackage";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledButtonPrimary,
  StyledEditPackagesTableCell
} from "src/styles";
import { CondaSpecificationPip } from "src/common/models";

export interface IRequestedPackagesEditProps {
  /**
   * @param packageList list of packages that we get from the API
   */
  packageList: (string | CondaSpecificationPip)[];
}

export const RequestedPackagesEdit = ({
  packageList
}: IRequestedPackagesEditProps) => {
  const [data, setData] = useState(packageList);
  const [isAdding, setIsAdding] = useState(false);
  const { palette } = useTheme();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const removePackage = (packageName: string) => {
    setData(currentData => currentData.filter(item => item !== packageName));
  };

  const addPackage = (packageName: string) => setData([...data, packageName]);

  const filteredPackageList = useMemo(
    () => data.filter(item => typeof item !== "object"),
    [data]
  );

  useEffect(() => {
    if (isAdding && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAdding]);

  return (
    <Accordion sx={{ width: 576, boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Requested Packages</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{
          padding: "23px 21px",
          borderRadius: "0px"
        }}
      >
        <Table aria-label="requested packages">
          <TableHead sx={{ border: "none" }}>
            <TableRow>
              <StyledEditPackagesTableCell
                align="left"
                sx={{
                  width: "120px"
                }}
              >
                <Typography
                  component="p"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Name
                </Typography>
              </StyledEditPackagesTableCell>
              <StyledEditPackagesTableCell
                align="left"
                sx={{
                  width: "180px"
                }}
              >
                <Typography
                  component="p"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Installed Version
                </Typography>
              </StyledEditPackagesTableCell>
              <StyledEditPackagesTableCell align="left">
                <Typography
                  component="p"
                  sx={{ fontSize: "16px", fontWeight: 500 }}
                >
                  Version Constraint
                </Typography>
              </StyledEditPackagesTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPackageList.map(requestedPackage => (
              <RequestedPackagesTableRow
                onRemove={removePackage}
                key={`${requestedPackage}`}
                requestedPackage={`${requestedPackage}`}
              />
            ))}
          </TableBody>
        </Table>
        <Box ref={scrollRef}>
          {isAdding && (
            <AddRequestedPackage onSubmit={addPackage} onCancel={setIsAdding} />
          )}
        </Box>
      </StyledAccordionDetails>
      <AccordionDetails
        sx={{
          border: `1px solid ${palette.primary.main}`,
          borderTop: "0px",
          borderRadius: "0px 0px 5px 5px",
          padding: "15px 21px"
        }}
      >
        <StyledButtonPrimary
          variant="contained"
          onClick={() => setIsAdding(true)}
        >
          + Add Package
        </StyledButtonPrimary>
      </AccordionDetails>
    </Accordion>
  );
};
