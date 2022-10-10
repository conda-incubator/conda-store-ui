import React, { useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledButtonPrimary,
  StyledEditPackagesTableCell
} from "../../../styles";
import { AddRequestedPackage } from "../../requestedPackages";
import useTheme from "@mui/material/styles/useTheme";
import {
  requestedPackageRemoved,
  requestedPackagesChanged
} from "../environmentCreateSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { CreateEnvironmentPackagesTableRow } from "./CreateEnvironmentPackagesTableRow";

export const CreateEnvironmentPackages = () => {
  const dispatch = useAppDispatch();
  const { requestedPackages } = useAppSelector(
    state => state.environmentCreate
  );
  const [isAdding, setIsAdding] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { palette } = useTheme();

  const handleRemovePackage = (requestedPackage: string) => {
    dispatch(requestedPackageRemoved(requestedPackage));
  };

  return (
    <Accordion
      sx={{ width: 421, boxShadow: "none" }}
      defaultExpanded
      disableGutters
    >
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
            {requestedPackages.map(requestedPackage => (
              <CreateEnvironmentPackagesTableRow
                key={requestedPackage}
                requestedPackage={requestedPackage}
                onRemove={handleRemovePackage}
              />
            ))}
          </TableBody>
        </Table>
        <Box ref={scrollRef}>
          {isAdding && (
            <AddRequestedPackage
              onSubmit={(value: string) =>
                dispatch(
                  requestedPackagesChanged([...requestedPackages, value])
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
          border: `1px solid ${palette.primary.main}`,
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
