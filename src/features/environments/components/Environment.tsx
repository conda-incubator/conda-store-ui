import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Environment as EnvironmentModel } from "../../../common/models";
import { StyledIconButton } from "../../../styles";
import { useTheme } from "@mui/material/styles";

interface IEnvironmentProps {
  /**
   * @param environment environment
   * @param onClick click handler
   * @param selectedEnvironmentId id of the currently selected environment
   */
  environment: EnvironmentModel;
  onClick: () => void;
  selectedEnvironmentId: number | undefined;
}

export const Environment = ({
  environment,
  onClick,
  selectedEnvironmentId
}: IEnvironmentProps) => {
  const isSelected = selectedEnvironmentId === environment.id;
  const theme = useTheme();

  return (
    <>
      <ListItemIcon
        sx={{ width: "5px", minWidth: "auto", marginRight: "12px" }}
      >
        <CircleIcon
          sx={{
            width: "9px",
            height: "9px",
            color: isSelected
              ? theme.palette.primary.light
              : theme.palette.primary.main
          }}
        />
      </ListItemIcon>
      <StyledIconButton
        onClick={onClick}
        sx={{
          textTransform: "none",
          fontSize: "13px",
          fontWeight: isSelected ? 600 : 400
        }}
      >
        {environment.name}
      </StyledIconButton>
    </>
  );
};
