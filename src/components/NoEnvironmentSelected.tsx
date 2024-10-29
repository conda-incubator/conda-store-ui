import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function NoEnvironmentSelected() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}
    >
      <Typography sx={{ fontSize: "18px", color: "#333" }}>
        Select an environment to show details
      </Typography>
    </Box>
  );
}
