import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const EnvironmentCreateHeader = () => {
  const [name, setName] = useState("Environment name");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "19px"
      }}
    >
      <TextField
        sx={{
          backgroundColor: "#ECECEC",
          border: "1px solid #000",
          width: "500px"
        }}
        inputProps={{
          style: {
            padding: "8px 16px",
            border: "none",
            fontSize: "24px",
            fontWeight: 500
          }
        }}
        variant="filled"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </Box>
  );
};
