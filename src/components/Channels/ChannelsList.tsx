import React from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import StyledAccordionSummary from "src/styles/StyledAccordionSummary";
import StyledAccordionTitle from "src/styles/StyledAccordionTitle";
import StyledAccordionExpandIcon from "src/styles/StyledAccordionExpandIcon";
import StyledAccordionDetails from "src/styles/StyledAccordionDetails";
import Channel from "./Channel";

interface IChannelsListProps {
  listHeight: number;
  channelList: string[];
}

const ChannelsList = ({ listHeight, channelList }: IChannelsListProps) => {
  const listLength = channelList.length;

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }}>
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
