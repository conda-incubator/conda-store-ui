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
import { getStylesForStyleType } from "../../../utils/helpers";

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

  const titleStyles = getStylesForStyleType(
    { fontSize: "24px", color: "#000" },
    { fontSize: "19px", color: "#3C4043", fontWeight: 400 }
  );

  const nameInputStyles = getStylesForStyleType(
    {
      backgroundColor: "#ECECEC",
      border: "1px solid #000",
      width: "500px"
    },
    {
      border: "1px solid #BCBFC4",
      width: "500px"
    }
  );

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
          <Typography sx={titleStyles}>{envName}</Typography>
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
            sx={nameInputStyles}
            inputProps={{
              style: {
                padding: "8px 16px",
                border: "none",
                fontSize: "24px",
                fontWeight: 500
              }
            }}
            variant="filled"
            placeholder="Environment name"
            onChange={e => onUpdateName(e.target.value)}
          />
          {/* <StyledButtonPrimary>Archive</StyledButtonPrimary> */}
        </>
      )}
    </Box>
  );
};
