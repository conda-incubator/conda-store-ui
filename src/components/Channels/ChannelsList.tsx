import React from "react";
import Accordion from "@mui/material/Accordion";
import StyledAccordionSummary from "src/styles/StyledAccordionSummary";
import StyledAccordionTitle from "src/styles/StyledAccordionTitle";
import StyledAccordionExpandIcon from "src/styles/StyledAccordionExpandIcon";
import StyledAccordionDetails from "src/styles/StyledAccordionDetails";

interface IChannelsListProps {
  listHeight: number;
}

const ChannelsList = ({ listHeight }: IChannelsListProps) => {
  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }}>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Channels</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{ maxHeight: `${listHeight}px`, padding: "11px 40px" }}
      >
        details
      </StyledAccordionDetails>
    </Accordion>
  );
};

export default ChannelsList;
