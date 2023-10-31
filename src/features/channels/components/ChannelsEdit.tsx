import React, { useState, useRef, memo } from "react";
import { useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import { AddChannel } from "./AddChannel";
import { ChannelsEditItem } from "./ChannelsEditItem";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledButtonPrimary
} from "../../../styles";
import { reorderArray } from "../../../utils/helpers";
import { ArrowIcon } from "../../../components";

export interface IChannelsEditProps {
  /**
   * @param channelsList list of channels
   * @param updateChannels handler that will update the channels list
   */
  channelsList: string[];
  updateChannels: (channels: string[]) => void;
}

const BaseChannelsEdit = ({
  channelsList,
  updateChannels
}: IChannelsEditProps) => {
  const listLength = channelsList.length;
  const { palette } = useTheme();
  const expandedRef = useRef(listLength > 0);

  const [isAdding, setIsAdding] = useState(false);

  const addNewChannel = (channelName: string) => {
    updateChannels([...channelsList, channelName]);
  };

  const removeChannel = (channelName: string) => {
    updateChannels(channelsList.filter(item => item !== channelName));
  };

  const editChannel = (channelName: string, newChannelName: string) => {
    const newChannelsList = channelsList.map(channel =>
      channel === channelName ? newChannelName : channel
    );

    updateChannels(newChannelsList);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { destination, source } = result;
    const reorderedArray = reorderArray({
      list: channelsList,
      startIndex: source.index,
      endIndex: destination.index
    });

    updateChannels(reorderedArray);
  };

  return (
    <Accordion
      defaultExpanded={expandedRef.current}
      sx={{ maxWidth: 420, boxShadow: "none" }}
      disableGutters
    >
      <StyledAccordionSummary expandIcon={<ArrowIcon />}>
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
              {channelsList.map((channel, index) => (
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
              <Box>
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
          border: `1px solid ${palette.secondary.light}`,
          borderTop: "0px",
          borderRadius: "0px",
          padding: "15px 21px",
          display: "flex",
          justifyContent: "center"
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

// rerender only when the passed channelsList and update handler are different then the previous props
const compareProps = (
  prevProps: IChannelsEditProps,
  nextProps: IChannelsEditProps
) => {
  const isSameArray =
    JSON.stringify(prevProps.channelsList) ===
    JSON.stringify(nextProps.channelsList);
  const isSameFunc = prevProps.updateChannels === nextProps.updateChannels;

  return isSameArray && isSameFunc;
};

export const ChannelsEdit = memo(BaseChannelsEdit, compareProps);
