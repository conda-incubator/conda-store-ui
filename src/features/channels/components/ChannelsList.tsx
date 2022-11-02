import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import React from "react";

import { Channel } from "./Channel";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "../../../styles";
import { ArrowIcon } from "../../../components";

export interface IChannelsListProps {
  /**
   * @param channelList list of channels
   */
  channelList: string[];
}

export const ChannelsList = ({ channelList }: IChannelsListProps) => {
  const listLength = channelList.length;

  return (
    <Accordion
      sx={{ width: 421, boxShadow: "none" }}
      disableGutters
      defaultExpanded
    >
      <StyledAccordionSummary expandIcon={<ArrowIcon />}>
        <StyledAccordionTitle>Channels</StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ padding: "11px 21px" }}>
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
