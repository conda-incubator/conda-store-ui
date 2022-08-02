import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { memo, useState } from "react";

import { StyledIconButton } from "src/styles";

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
      <Box
        sx={{
          height: "32px",
          width: "205px",
          backgroundColor: "#D9D9D9",
          border: "1px solid #000",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "10px",
            backgroundColor: "#7E7E7E",
            display: "inline-block",
            marginLeft: "-1px",
            borderRight: "1px solid #000"
          }}
        />
        <DragIndicatorIcon
          sx={{
            color: "#9B9A9A",
            marginRight: "10px"
          }}
        />
        {!isEditing && (
          <Box
            onClick={() => setIsEditing(true)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <Typography sx={{ color: "#4D4D4D" }}>{channelName}</Typography>
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
      >
        <DeleteIcon />
      </StyledIconButton>
    </Box>
  );
};

export const ChannelsEditItem = memo(BaseChannelsEditItem);
