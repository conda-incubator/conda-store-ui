import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const AddChannel = () => {
  return (
    <Box sx={{ marginBottom: "20px", width: "207px", height: "34px" }}>
      <TextField autoFocus label="Enter channel" size="small" />
    </Box>
  );
};

export default AddChannel;
