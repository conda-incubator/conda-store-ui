import React from "react";
import { Specification } from "./Specification";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { StyledButtonPrimary } from "src/styles";
import { modeChanged } from "../environmentDetailsSlice";

export const EnvironmentDetails = () => {
  const { mode } = useAppSelector(state => state.environmentDetails);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ border: "1px solid #000", padding: "18px 12px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "19px"
        }}
      >
        <Typography sx={{ fontSize: "24px", color: "#000" }}>
          Machine Learning
        </Typography>
        <StyledButtonPrimary onClick={() => dispatch(modeChanged("edit"))}>
          Edit
        </StyledButtonPrimary>
      </Box>
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
