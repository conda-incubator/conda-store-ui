import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "src/hooks";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { Specification } from "./Specification";

export const EnvironmentDetails = () => {
  const { mode } = useAppSelector(state => state.environmentDetails);

  return (
    <Box sx={{ border: "1px solid #000", padding: "18px 12px" }}>
      <EnvironmentDetailsHeader />
      <Box sx={{ marginBottom: "30px" }}>
        <Typography>Environment Metadata</Typography>
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <Specification />
      </Box>
      {mode === "read-only" && (
        <Box>
          <Typography>Logs and artifacts</Typography>
        </Box>
      )}
    </Box>
  );
};
