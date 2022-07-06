import React from "react";

import Accordion from "@mui/material/Accordion";
import { RequestedPackage } from ".";
import Box from "@mui/material/Box";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "src/styles";

interface IRequestedPackageListProps {
  packageList: (string | object)[];
}

const RequestedPackageList = ({ packageList }: IRequestedPackageListProps) => {
  const filteredPackageList = packageList.filter(
    item => typeof item !== "object"
  );
  const listLength = filteredPackageList.length;

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Requested Packages</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ padding: "11px 40px" }}>
        {filteredPackageList.map((item, index) => (
          <Box
            key={`${item}`}
            sx={{ marginBottom: index === listLength - 1 ? "0px" : "15px" }}
          >
            <RequestedPackage requestedPackage={`${item}`} />
          </Box>
        ))}
      </StyledAccordionDetails>
    </Accordion>
  );
};

export default RequestedPackageList;
