import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

import { StyledIconButton } from "src/styles";

interface IAddChannelProps {
  /**
   * @param onCancel handler that will run when close icon is clicked
   * @param onSubmit handler that will run when the input looses focus or when enter key is pressed
   */
  onCancel: () => void;
  onSubmit: (channelName: string) => void;
}

export const AddChannel = ({ onCancel, onSubmit }: IAddChannelProps) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name) {
      onSubmit(name);
      onCancel();
    }
  };

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box
      sx={{
        marginBottom: "20px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <TextField
        autoFocus
        label="Enter channel"
        size="small"
        onChange={e => setName(e.target.value)}
        onKeyDown={keyPress}
        onBlur={handleSubmit}
        sx={{
          marginRight: "15px",
          width: "207px",
          height: "34px"
        }}
      />
      <StyledIconButton onClick={onCancel}>
        <CloseIcon sx={{ marginTop: "5px" }} />
      </StyledIconButton>
    </Box>
  );
};
