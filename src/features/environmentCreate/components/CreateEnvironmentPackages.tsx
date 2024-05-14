import React, { useState, useMemo } from "react";
import {
  Accordion,
  AccordionDetails,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { Box } from "@mui/system";
import { ArrowIcon } from "../../../components";
import { useAppDispatch } from "../../../hooks";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledButtonPrimary,
  StyledEditPackagesTableCell
} from "../../../styles";
import { AddRequestedPackage } from "../../requestedPackages";
import { requestedPackageAdded } from "../environmentCreateSlice";
import { CreateEnvironmentPackagesTableRow } from "./CreateEnvironmentPackagesTableRow";
import { CondaSpecificationPip } from "../../../common/models/CondaSpecificationPip";

interface ICreateEnvironmentPackagesProps {
  /**
   * @param requestedPackages list of created packages
   */
  namespaceName: string;
  requestedPackages: (string | CondaSpecificationPip)[];
}

export const CreateEnvironmentPackages = ({
  namespaceName,
  requestedPackages
}: ICreateEnvironmentPackagesProps) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const { palette } = useTheme();

  const filteredRequestedPackages: string[] = useMemo(
    () => requestedPackages.filter(item => typeof item === "string") as string[],
    [requestedPackages]
  );

  return (
    <Accordion
      sx={{ maxWidth: 420, boxShadow: "none" }}
      defaultExpanded
      disableGutters
    >
      <StyledAccordionSummary expandIcon={<ArrowIcon />}>
        <StyledAccordionTitle>Requested Packages</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{
          padding: "20px 15px",
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
                  sx={{ fontSize: "13px", fontWeight: 500 }}
                >
                  Name
                </Typography>
              </StyledEditPackagesTableCell>
              <StyledEditPackagesTableCell align="left">
                <Typography
                  component="p"
                  sx={{ fontSize: "13px", fontWeight: 500 }}
                >
                  Version Constraint
                </Typography>
              </StyledEditPackagesTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequestedPackages.map(requestedPackage => (
              <CreateEnvironmentPackagesTableRow
                key={requestedPackage}
                namespaceName={namespaceName}
                requestedPackage={requestedPackage}
              />
            ))}
          </TableBody>
        </Table>
        <Box>
          {isAdding && (
            <AddRequestedPackage
              onSubmit={(value: string) =>
                dispatch(
                  requestedPackageAdded([
                    `${namespaceName}/new-environment`,
                    value
                  ])
                )
              }
              onCancel={() => setIsAdding(false)}
              isCreating={true}
            />
          )}
        </Box>
      </StyledAccordionDetails>
      <AccordionDetails
        sx={{
          border: `1px solid ${palette.secondary.light}`,
          borderTop: "0px",
          borderRadius: "0px 0px 5px 5px",
          padding: "15px 21px",
          display: "flex",
          justifyContent: "center"
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
