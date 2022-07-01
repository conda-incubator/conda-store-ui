import React, { useState } from "react";
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
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import reorderArray from "src/utils/helpers/reorderArray";

interface IChannelsEditProps {
  channelsList: string[];
  listHeight: number;
}

const ChannelsEdit = ({ listHeight, channelsList }: IChannelsEditProps) => {
  const { palette } = useTheme();
  const listLength = channelsList.length;

  const [list, setList] = useState(channelsList);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { destination, source } = result;
    const reorderedArray = reorderArray({
      list,
      startIndex: source.index,
      endIndex: destination.index
    });

    setList(reorderedArray);
  };

  return (
    <Accordion sx={{ width: 421, boxShadow: "none" }} disableGutters>
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>Channels</StyledAccordionTitle>
      </StyledAccordionSummary>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="channels-edit-list">
          {provided => (
            <StyledAccordionDetails
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                maxHeight: `${listHeight}px`,
                padding: "18px 20px",
                paddingBottom: `${listLength === 0 ? "20px" : "0px"}`,
                borderRadius: "0px",
                minHeight: `${listLength * 47}px`
              }}
            >
              {list.map((channel, index) => (
                <Draggable key={channel} draggableId={channel} index={index}>
                  {provided => (
                    <Box
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      sx={{
                        marginBottom: "20px"
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
