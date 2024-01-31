import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useTheme from "@mui/material/styles/useTheme";
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
  showEditButton: boolean | undefined;
  onUpdateName: (value: string) => void;
}

export const EnvironmentDetailsHeader = ({
  envName = "",
  onUpdateName,
  showEditButton = true
}: IEnvironmentDetailsHeaderProps) => {
  const { mode } = useAppSelector(state => state.environmentDetails);
  const dispatch = useAppDispatch();
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "15px"
      }}
    >
      {(mode === EnvironmentDetailsModes.READ ||
        mode === EnvironmentDetailsModes.EDIT) && (
        <>
          <Typography
            sx={{
              fontSize: "16px",
              color: palette.common.black,
              fontWeight: 600
            }}
          >
            {envName}
          </Typography>
          {mode === EnvironmentDetailsModes.READ && (
            <StyledButtonPrimary
              disabled={!showEditButton}
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
            autoFocus
            placeholder="Environment name"
            sx={{
              backgroundColor: palette.grey[100],
              minWidth: "450px",
              "&:hover fieldset": {
                borderColor: palette.secondary.main
              }
            }}
            inputProps={{
              style: {
                padding: "8px 15px",
                fontSize: "15px",
                color: palette.common.black
              }
            }}
            onChange={e => onUpdateName(e.target.value)}
          />
          {/* <StyledButtonPrimary>Archive</StyledButtonPrimary> */}
        </>
      )}
    </Box>
  );
};
