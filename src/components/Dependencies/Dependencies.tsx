import React from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import {
  StyledAccordionExpandIcon,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "src/styles";
import DependenciesItem from "./DependenciesItem";
import { Dependency } from "src/common/models";

interface IDependenciesProps {
  dependencies: Dependency[];
}

const Dependencies = ({ dependencies }: IDependenciesProps) => {
  const listLength = dependencies.length;

  return (
    <Accordion sx={{ maxWidth: "490px", boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>
          Packages Installed as Dependencies
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ padding: "15px 40px" }}>
        {dependencies.map((dependency, index) => (
          <Box
            key={dependency.id}
            sx={{ marginBottom: index === listLength - 1 ? "0px" : "20px" }}
          >
            <DependenciesItem dependency={dependency} />
          </Box>
        ))}
      </StyledAccordionDetails>
    </Accordion>
  );
};

export default Dependencies;
