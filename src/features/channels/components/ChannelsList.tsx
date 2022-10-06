import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import React from "react";

import { Channel } from "./Channel";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "src/styles";

export interface IChannelsListProps {
  /**
   * @param channelList list of channels
   */
  channelList: string[];
}

export const ChannelsList = ({ channelList }: IChannelsListProps) => {
  const listLength = channelList.length;

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Channels</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ padding: "11px 40px" }}>
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
