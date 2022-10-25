import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { StyledButtonPrimary } from "../../../styles";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  EnvironmentDetailsModes,
  modeChanged
} from "../environmentDetailsSlice";

interface IEnvironmentDetailsHeaderProps {
  /**
   * @param envName name of the selected environment
   * @param onUpdateName change environment name
   */
  envName?: string;
  onUpdateName: (value: string) => void;
}

export const EnvironmentDetailsHeader = ({
  envName = "",
  onUpdateName
}: IEnvironmentDetailsHeaderProps) => {
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
      {(mode === EnvironmentDetailsModes.READ ||
        mode === EnvironmentDetailsModes.EDIT) && (
        <>
          <Typography
            sx={{ fontSize: "19px", color: "#3C4043", fontWeight: 400 }}
          >
            {envName}
          </Typography>
          {mode === EnvironmentDetailsModes.READ && (
            <StyledButtonPrimary
              onClick={() =>
                dispatch(modeChanged(EnvironmentDetailsModes.EDIT))
              }
            >
              Edit
            </StyledButtonPrimary>
          )}
        </>
      )}
      {mode === EnvironmentDetailsModes.CREATE && (
        <>
          <TextField
            sx={{
              backgroundColor: "#EBECEE",
              minWidth: "450px",
              "&:hover fieldset": {
                borderColor: "grey"
              }
            }}
            inputProps={{
              disableUnderline: true,
              style: {
                padding: "8px 15px",
                fontSize: "20px",
                color: "#3C4043"
              }
            }}
            placeholder="Environment name"
            onChange={e => onUpdateName(e.target.value)}
          />
          {/* <StyledButtonPrimary>Archive</StyledButtonPrimary> */}
        </>
      )}
    </Box>
  );
};
