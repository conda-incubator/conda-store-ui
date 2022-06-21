import AccordionDetails from "@mui/material/AccordionDetails";
import useTheme from "@mui/material/styles/useTheme";
import Accordion from "@mui/material/Accordion";
import React from "react";
import StyledAccordionDetails from "src/styles/StyledAccordionDetails";
import StyledAccordionExpandIcon from "src/styles/StyledAccordionExpandIcon";
import StyledAccordionSummary from "src/styles/StyledAccordionSummary";
import StyledAccordionTitle from "src/styles/StyledAccordionTitle";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import StyledEditPackagesTableCell from "src/styles/StyledEditPackagesTableCell";

const RequestedPackagesEdit = () => {
  const { palette } = useTheme();

  return (
    <Accordion sx={{ width: 576, boxShadow: "none" }}>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Requested Packages</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{ maxHeight: "90px", padding: "23px 21px", borderRadius: "0px" }}
      >
        <Table aria-label="requested packages">
          <TableHead sx={{ border: "none" }}>
            <TableRow>
              <StyledEditPackagesTableCell
                align="left"
                sx={{
                  width: "120px",
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
        </Table>
      </StyledAccordionDetails>
      <AccordionDetails
        sx={{
          border: `1px solid ${palette.primary.main}`,
          borderTop: "0px",
          borderRadius: "0px 0px 5px 5px",
          padding: "15px 21px",
        }}
      >
        Details 2
      </AccordionDetails>
    </Accordion>
  );
};

export default RequestedPackagesEdit;
