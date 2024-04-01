import React from "react";
import { Link } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import { Environment as EnvironmentModel } from "../../../common/models";
import { useTheme } from "@mui/material/styles";

interface IEnvironmentProps {
  /**
   * @param environment environment
   * @param onClick click handler
   * @param selectedEnvironmentId id of the currently selected environment
   */
  environment: EnvironmentModel;
  selectedEnvironmentId: number | undefined;
}

export const Environment = ({
  environment,
  selectedEnvironmentId
}: IEnvironmentProps) => {
  const isSelected = selectedEnvironmentId === environment.id;
  const theme = useTheme();

  return (
    <>
      <ListItemIcon
        sx={{
          width: "5px",
          minWidth: "auto",
          marginRight: "12px"
        }}
      >
        <CircleIcon
          sx={{
            width: "5px",
            height: "5px",
            color: isSelected
              ? theme.palette.primary.main
              : theme.palette.common.black
          }}
        />
      </ListItemIcon>
      <Button
        component={Link}
        to={`/${environment.namespace.name}/${environment.name}`}
        sx={{
          color: isSelected
            ? theme.palette.primary.main
            : theme.palette.common.black,
          backgroundColor: isSelected ? theme.palette.primary[50] : "none",
          borderRadius: "0px",
          padding: "0px",
          minWidth: "auto",
          textTransform: "none",
          fontSize: "13px",
          fontWeight: isSelected ? 600 : 400,
          textDecoration: isSelected ? "underline" : "none",
          textUnderlineOffset: "0.3em",
          ":hover": {
            boxShadow: "none",
            textDecoration: "underline",
            textUnderlineOffset: "0.3em"
          }
        }}
      >
        {environment.name}
      </Button>
    </>
  );
};
