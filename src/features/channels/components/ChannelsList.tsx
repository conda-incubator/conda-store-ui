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
  return (
    <Accordion
      sx={{ maxWidth: 420, boxShadow: "none" }}
      disableGutters
      defaultExpanded
    >
      <StyledAccordionSummary expandIcon={<ArrowIcon />}>
        <StyledAccordionTitle sx={{ color: "primary.main" }}>
          Channels
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails sx={{ padding: 0 }}>
        {channelList.map((channel, index) => (
          <Box
            key={channel}
            sx={{
              padding: "16px"
            }}
          >
            <Channel channelName={channel} />
          </Box>
        ))}
      </StyledAccordionDetails>
    </Accordion>
  );
};
