import React, { useState, useMemo } from "react";
import {
  Accordion,
  AccordionDetails,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
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
  StyledButton,
} from "../../../styles";
import { AddRequestedPackage } from "../../requestedPackages";
import { requestedPackagesChanged } from "../environmentCreateSlice";
import { CreateEnvironmentPackagesTableRow } from "./CreateEnvironmentPackagesTableRow";

interface ICreateEnvironmentPackagesProps {
  /**
   * @param requestedPackages list of created packages
   */
  requestedPackages: string[];
}

export const CreateEnvironmentPackages = ({
  requestedPackages
}: ICreateEnvironmentPackagesProps) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const { palette } = useTheme();

  const filteredRequestedPackages = useMemo(
    () => requestedPackages.filter(item => typeof item !== "object"),
    [requestedPackages]
  );

  return (
    <Accordion
      sx={{ maxWidth: 420, boxShadow: "none" }}
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
          padding: 0,
          borderRadius: "0px"
        }}
      >
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequestedPackages.map(requestedPackage => (
              <CreateEnvironmentPackagesTableRow
                key={requestedPackage}
                requestedPackage={requestedPackage}
              />
            ))}
          </TableBody>
        </Table>
        {isAdding && (
          <Box sx={{ padding: "0 0 16px 16px" }}>
            <AddRequestedPackage
              onSubmit={(value: string) =>
                dispatch(
                  requestedPackagesChanged([
                    ...filteredRequestedPackages,
                    value
                  ])
                )
              }
              onCancel={() => setIsAdding(false)}
              isCreating={true}
            />
          </Box>
        )}
      </StyledAccordionDetails>
      <AccordionDetails
        sx={{
          border: `1px solid ${palette.secondary.light}`,
          borderTop: "0px",
          borderRadius: "0px 0px 5px 5px",
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
