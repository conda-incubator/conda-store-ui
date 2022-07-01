import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import StyledAccordionSummary from "src/styles/StyledAccordionSummary";
import StyledAccordionExpandIcon from "src/styles/StyledAccordionExpandIcon";
import StyledAccordionTitle from "src/styles/StyledAccordionTitle";
import StyledAccordionDetails from "src/styles/StyledAccordionDetails";
import StyledButtonPrimary from "src/styles/StyledButtonPrimary";
import { useTheme } from "@mui/material";
import ChannelsEditItem from "./ChannelsEditItem";

interface IChannelsEditProps {
  listHeight: number;
}

const ChannelsEdit = ({ listHeight }: IChannelsEditProps) => {
  const { palette } = useTheme();

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Channels</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{
          maxHeight: `${listHeight}px`,
          padding: "18px 20px",
          borderRadius: "0px"
        }}
      >
        <ChannelsEditItem />
      </StyledAccordionDetails>
      <AccordionDetails
        sx={{
          border: `1px solid ${palette.primary.main}`,
          borderTop: "0px",
          borderRadius: "0px 0px 5px 5px",
          padding: "15px 21px"
        }}
      >
        <StyledButtonPrimary variant="contained">
          + Add Channel
        </StyledButtonPrimary>
      </AccordionDetails>
    </Accordion>
  );
};

export default ChannelsEdit;
