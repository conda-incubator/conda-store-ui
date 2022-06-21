import Accordion from "@mui/material/Accordion";
import React from "react";
import StyledAccordionDetails from "src/styles/StyledAccordionDetails";
import StyledAccordionExpandIcon from "src/styles/StyledAccordionExpandIcon";
import StyledAccordionSummary from "src/styles/StyledAccordionSummary";
import StyledAccordionTitle from "src/styles/StyledAccordionTitle";

const RequestedPackagesEdit = () => {
  return (
    <Accordion sx={{ width: 576, boxShadow: "none" }}>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Requested Packages</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ maxHeight: "90px" }}>
        Content
      </StyledAccordionDetails>
    </Accordion>
  );
};

export default RequestedPackagesEdit;
