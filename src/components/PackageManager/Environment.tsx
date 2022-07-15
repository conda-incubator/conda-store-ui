import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import CircleIcon from "@mui/icons-material/Circle";

export const Environment = () => {
  const {
    palette: { primary }
  } = useTheme();

  return (
    <ListItem disablePadding>
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
      <Typography>Risk Analytics</Typography>
    </ListItem>
  );
};
