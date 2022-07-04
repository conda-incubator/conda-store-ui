import React from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import { Channel } from ".";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "src/styles";

interface IChannelsListProps {
  listHeight: number;
  channelList: string[];
}

const ChannelsList = ({ listHeight, channelList }: IChannelsListProps) => {
  const listLength = channelList.length;

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Channels</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        sx={{ maxHeight: `${listHeight}px`, padding: "11px 40px" }}
      >
        {channelList.map((channel, index) => (
          <Box
            key={channel}
            sx={{ marginBottom: index === listLength - 1 ? "0px" : "10px" }}
          >
            <Channel channelName={channel} />
          </Box>
        ))}
      </StyledAccordionDetails>
    </Accordion>
  );
};

export default ChannelsList;
