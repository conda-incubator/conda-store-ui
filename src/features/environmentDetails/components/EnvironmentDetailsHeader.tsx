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
   * @param namespace namespace of the environment
   * @param onUpdateName change environment name
   */
  envName?: string;
  namespace?: string;
  showEditButton: boolean | undefined;
  onUpdateName: (value: string) => void;
}

export const EnvironmentDetailsHeader = ({
  envName = "",
  namespace,
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
        justifyContent:
          mode === EnvironmentDetailsModes.CREATE ? "start" : "space-between",
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
          {namespace && (
            <>
              <TextField
                label="Namespace"
                value={namespace}
                disabled
                size="small"
              />
              <div
                aria-hidden
                style={{
                  borderRight: `2px solid ${palette.secondary.main}`,
                  transform: "skew(-15deg)",
                  margin: "0 1rem",
                  height: "1.6rem"
                }}
              />
            </>
          )}
          <TextField
            autoFocus
            label="Environment name"
            sx={{
              backgroundColor: palette.grey[100],
              minWidth: "450px",
              "&:hover fieldset": {
                borderColor: palette.secondary.main
              }
            }}
            inputProps={{
              style: {
                color: palette.common.black
              }
            }}
            size="small"
            onChange={e => onUpdateName(e.target.value)}
          />
          {/* <StyledButtonPrimary>Archive</StyledButtonPrimary> */}
        </>
      )}
    </Box>
  );
};
