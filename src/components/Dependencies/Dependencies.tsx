import React from "react";
import Accordion from "@mui/material/Accordion";
import {
  StyledAccordionExpandIcon,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "src/styles";

const Dependencies = () => {
  return (
    <Accordion sx={{ maxWidth: "490px", boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>
          Packages Installed as Dependencies
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails>Details</StyledAccordionDetails>
    </Accordion>
  );
};

export default Dependencies;
