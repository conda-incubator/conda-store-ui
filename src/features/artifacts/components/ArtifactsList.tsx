import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import React from "react";

import { LogsArtifacts } from "./Artifacts";
import {
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle,
  StyledAccordionExpandIcon
} from "src/styles";

import { Artifacts } from "src/common/models";
import { StyledBox } from "src/styles/StyledBox";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

export interface IArtifactsProps {
  /**
   * TODO: this interface needs a docstring for each param
   */
  linkList: Artifacts[];
}

export const ArtifactsList = ({ linkList }: IArtifactsProps) => {
  const listLength = linkList.length;

  return (
    // <Accordion sx={{ width: 421, boxShadow: "none" }} disableGutters>
    <StyledBox>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper"
        }}
      >
        <ListItem>
          <ListItemText primary="Logs and Artifacts" />
        </ListItem>
        <Divider
          sx={{
            color: "#000000"
          }}
        />
        {linkList.map((option, index) => (
          <ListItem>
            {/* <StyledAccordionDetails sx={{ padding: "11px 40px" }}> */}
            <Box
              key={option.name}
              sx={{
                marginBottom: index === listLength - 1 ? "0px" : "10px",
                width: 1
              }}
            >
              <LogsArtifacts linkOption={option} />
            </Box>
          </ListItem>
        ))}
      </List>
    </StyledBox>
  );
};
