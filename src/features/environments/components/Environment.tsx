import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemIcon from "@mui/material/ListItemIcon";
import useTheme from "@mui/material/styles/useTheme";
import { Environment as EnvironmentModel } from "../../../common/models";
import { StyledIconButton } from "../../../styles";
import { getStylesForStyleType } from "../../../utils/helpers";

interface IEnvironmentProps {
  /**
   * @param environment environment
   * @param onClick click handler
   */
  environment: EnvironmentModel;
  onClick: () => void;
}

export const Environment = ({ environment, onClick }: IEnvironmentProps) => {
  const {
    palette: { primary }
  } = useTheme();

  const circleIconStyles = getStylesForStyleType(
    { width: "5px", height: "5px", color: primary.main },
    { width: "9px", height: "9px", color: "#B9D9BD" }
  );

  const buttonStyles = getStylesForStyleType(
    { textTransform: "none", fontSize: "16px", fontWeight: 400 },
    { textTransform: "none", fontSize: "14px", fontWeight: 600 }
  );

  return (
    <>
      <ListItemIcon
        sx={{ width: "5px", minWidth: "auto", marginRight: "12px" }}
      >
        <CircleIcon sx={circleIconStyles} />
      </ListItemIcon>
      <StyledIconButton sx={buttonStyles} onClick={onClick}>
        {environment.name}
      </StyledIconButton>
    </>
  );
};
