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
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../hooks";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledButtonPrimary,
  StyledEditPackagesTableCell
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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { palette } = useTheme();

  useEffect(() => {
    if (isAdding && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAdding]);

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
