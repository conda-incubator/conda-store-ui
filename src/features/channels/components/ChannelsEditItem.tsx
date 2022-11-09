import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { memo, useState } from "react";
import { ChannelIcon, DeleteIconAlt } from "../../../components";

import { StyledIconButton } from "../../../styles";
import {
  getIconForStyleType,
  getStylesForStyleType
} from "../../../utils/helpers";

interface IChannelsEditItemProps {
  /**
   * @param channelName list of channels
   * @param onRemove handler that will run when delete button is clicked
   * @param onEdit handler that will run when editing is finished
   */
  channelName: string;
  onRemove: (channelName: string) => void;
  onEdit: (channelName: string, newChannelName: string) => void;
}

const BaseChannelsEditItem = ({
  channelName,
  onRemove,
  onEdit
}: IChannelsEditItemProps) => {
  const [name, setName] = useState(channelName);
  const [isEditing, setIsEditing] = useState(false);

  const dragIcon = getIconForStyleType(
    <ChannelIcon color="#C4C7CC" />,
    <ChannelIcon color="#A8DAB5" />
  );

  const boxStyles = getStylesForStyleType({
    height: "100%",
    width: "10px",
    backgroundColor: "#C4C7CC",
    display: "inline-block",
    marginLeft: "-1px",
    borderRight: "1px solid #F1F1F1",
    borderLeft: "1px solid #F1F1F1"
  });

  const containerStyles = getStylesForStyleType({
    height: "32px",
    width: "205px",
    backgroundColor: "#F1F1F1",
    border: "1px solid #BCBFC4",
    display: "flex",
    alignItems: "center"
  });

  const handleSubmit = () => {
    if (name) {
      onEdit(channelName, name);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={containerStyles}>
        <Box sx={boxStyles} />
        {dragIcon}
        {!isEditing && (
          <Box
            onClick={() => setIsEditing(true)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <Typography sx={{ fontSize: "14px", color: "#4D4D4D" }}>
              {channelName}
            </Typography>
          </Box>
        )}
        {isEditing && (
          <TextField
            autoFocus
            size="small"
            sx={{ width: "140px" }}
            inputProps={{ style: { padding: "0px 5px" } }}
            onBlur={handleSubmit}
            value={name}
            onKeyDown={handleKeyDown}
            onChange={e => setName(e.target.value)}
          />
        )}
      </Box>
      <StyledIconButton
        sx={{ marginLeft: "15px" }}
        onClick={() => onRemove(channelName)}
        data-testid="DeleteIcon"
      >
        <DeleteIconAlt />
      </StyledIconButton>
    </Box>
  );
};

export const ChannelsEditItem = memo(BaseChannelsEditItem);
