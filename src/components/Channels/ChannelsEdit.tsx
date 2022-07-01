import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import StyledAccordionSummary from "src/styles/StyledAccordionSummary";
import StyledAccordionExpandIcon from "src/styles/StyledAccordionExpandIcon";
import StyledAccordionTitle from "src/styles/StyledAccordionTitle";
import StyledAccordionDetails from "src/styles/StyledAccordionDetails";
import StyledButtonPrimary from "src/styles/StyledButtonPrimary";
import { useTheme } from "@mui/material";
import ChannelsEditItem from "./ChannelsEditItem";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import getItemStyle from "src/utils/helpers/getItemStyle";

interface IChannelsEditProps {
  channelsList: string[];
  listHeight: number;
}

const ChannelsEdit = ({ listHeight, channelsList }: IChannelsEditProps) => {
  const { palette } = useTheme();
  const listLength = channelsList.length;

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Channels</StyledAccordionTitle>
      </StyledAccordionSummary>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="channels-edit-list">
          {provided => (
            <StyledAccordionDetails
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                maxHeight: `${listHeight}px`,
                padding: "18px 20px",
                borderRadius: "0px",
                minHeight: `${listLength * 47}px`
              }}
            >
              {channelsList.map((channel, index) => (
                <Draggable key={channel} draggableId={channel} index={index}>
                  {provided => (
                    <Box
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      sx={{
                        marginBottom: index === listLength - 1 ? "0px" : "20px"
                      }}
                    >
                      <ChannelsEditItem channelName={channel} />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledAccordionDetails>
          )}
        </Droppable>
      </DragDropContext>
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
