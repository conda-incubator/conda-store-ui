import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function NotFound() {
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
      <Typography
        variant="h1"
        sx={{ fontSize: "18px", color: "secondary.dark" }}
      >
        404 - Not found
      </Typography>
    </Box>
  );
}
