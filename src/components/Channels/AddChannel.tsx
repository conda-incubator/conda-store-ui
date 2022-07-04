import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import StyledIconButton from "src/styles/StyledIconButton";

interface IAddChannelProps {
  onCancel: () => void;
  onSubmit: (channelName: string) => void;
}

const AddChannel = ({ onCancel, onSubmit }: IAddChannelProps) => {
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
          marginRight: "20px",
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

export default AddChannel;
