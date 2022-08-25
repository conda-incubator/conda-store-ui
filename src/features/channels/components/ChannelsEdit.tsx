import { useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import React, { useState, useRef, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import { useAppDispatch } from "src/hooks";
import { addChannel, deleteChannel } from "src/features/channels";
import { AddChannel } from "./AddChannel";
import { ChannelsEditItem } from "./ChannelsEditItem";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledButtonPrimary
} from "src/styles";
import { reorderArray } from "src/utils/helpers";

export interface IChannelsEditProps {
  /**
   * @param channelsList list of channels
   */
  channelsList: string[];
}

export const ChannelsEdit = ({ channelsList }: IChannelsEditProps) => {
  const { palette } = useTheme();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const [list, setList] = useState(channelsList);
  const [isAdding, setIsAdding] = useState(false);

  const listLength = list.length;

  const addNewChannel = (channelName: string) => {
    setList([...list, channelName]);
    dispatch(addChannel(channelName));
  };

  const removeChannel = (channelName: string) => {
    const filteredList = list.filter(channel => channel !== channelName);

    setList(filteredList);
    dispatch(deleteChannel(channelName));
  };

  const editChannel = (channelName: string, newChannelName: string) => {
    const newChannelsList = list.map(channel =>
      channel === channelName ? newChannelName : channel
    );

    setList(newChannelsList);
  };

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

  useEffect(() => {
    if (isAdding && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAdding]);

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
                padding: "18px 20px",
                paddingBottom: `${listLength === 0 ? "20px" : "0px"}`,
                borderRadius: "0px"
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
                        marginBottom: "20px",
                        width: "247px"
                      }}
                    >
                      <ChannelsEditItem
                        onRemove={removeChannel}
                        channelName={channel}
                        onEdit={editChannel}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Box ref={scrollRef}>
                {isAdding && (
                  <AddChannel
                    onSubmit={addNewChannel}
                    onCancel={() => setIsAdding(false)}
                  />
                )}
              </Box>
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
        <StyledButtonPrimary
          variant="contained"
          onClick={() => setIsAdding(true)}
        >
          + Add Channel
        </StyledButtonPrimary>
      </AccordionDetails>
    </Accordion>
  );
};
