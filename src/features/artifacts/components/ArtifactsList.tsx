import Box from "@mui/material/Box";
import React from "react";
import { Artifact } from "./Artifact";
import { Artifacts } from "src/common/models";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

export interface IArtifactsProps {
  /**
   * TODO: this interface needs a docstring for each param
   */
  linkList: Artifacts[];
}

export const ArtifactsList = ({ linkList }: IArtifactsProps) => {
  const listLength = linkList.length;
  const { typography, palette } = useTheme();
  return (
    <Box
      sx={{
        border: 1,
        width: 1000,
        marginTop: "25px",
        boxShadow: "none"
      }}
    >
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: "21px", fontWeight: 400 }}>
                Logs and Artifacts
              </Typography>
            }
          ></ListItemText>
        </ListItem>
        <Divider sx={{ bgcolor: palette.primary.main }} />
        {linkList.map((link, index) => (
          <ListItem
            key={link.name}
            sx={{
              padding: "11px 40px",
              fontFamily: typography.fontFamily
            }}
          >
            <Box
              key={link.name}
              sx={{ marginBottom: index === listLength - 1 ? "0px" : "10px" }}
            >
              <Artifact linkOption={link} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
