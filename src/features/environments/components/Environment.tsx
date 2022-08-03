import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import useTheme from "@mui/material/styles/useTheme";
import CircleIcon from "@mui/icons-material/Circle";
import { Environment as EnvironmentModel } from "src/common/models";
import { StyledIconButton } from "src/styles";
import { useAppDispatch } from "src/hooks";
import { environmentOpened } from "src/features/tabs";

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

  return (
    <>
      <ListItemIcon
        sx={{ width: "5px", minWidth: "auto", marginRight: "12px" }}
      >
        <CircleIcon
          sx={{
            color: primary.main,
            width: "5px",
            height: "5px"
          }}
        />
      </ListItemIcon>
      <StyledIconButton
        sx={{ textTransform: "none", fontSize: "16px", fontWeight: 400 }}
        onClick={onClick}
      >
        {environment.name}
      </StyledIconButton>
    </>
  );
};
