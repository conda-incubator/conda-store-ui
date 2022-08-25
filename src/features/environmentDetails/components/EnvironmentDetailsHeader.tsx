import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { StyledButtonPrimary } from "src/styles";
import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  EnvironmentDetailsModes,
  modeChanged
} from "../environmentDetailsSlice";

export const EnvironmentDetailsHeader = () => {
  const { mode, name } = useAppSelector(state => state.environmentDetails);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(name);
  }, [name]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "19px"
      }}
    >
      {mode === EnvironmentDetailsModes.READ && (
        <>
          <Typography sx={{ fontSize: "24px", color: "#000" }}>
            {name}
          </Typography>
          <StyledButtonPrimary
            onClick={() => dispatch(modeChanged(EnvironmentDetailsModes.EDIT))}
          >
            Edit
          </StyledButtonPrimary>
        </>
      )}
      {mode === EnvironmentDetailsModes.EDIT && (
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
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          {/* <StyledButtonPrimary>Archive</StyledButtonPrimary> */}
        </>
      )}
    </Box>
  );
};
