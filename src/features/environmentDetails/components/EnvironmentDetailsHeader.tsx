import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { StyledButtonPrimary } from "src/styles";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { modeChanged } from "../environmentDetailsSlice";

export const EnvironmentDetailsHeader = () => {
  const { mode } = useAppSelector(state => state.environmentDetails);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "19px"
      }}
    >
      {mode === "read-only" && (
        <>
          <Typography sx={{ fontSize: "24px", color: "#000" }}>
            Machine Learning
          </Typography>
          <StyledButtonPrimary onClick={() => dispatch(modeChanged("edit"))}>
            Edit
          </StyledButtonPrimary>
        </>
      )}
      {mode === "edit" && (
        <>
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
            defaultValue="Machine Learning"
          />
          <StyledButtonPrimary>Archive</StyledButtonPrimary>
        </>
      )}
    </Box>
  );
};
