import Box from "@mui/material/Box";
import React from "react";
import { ArtifactItem } from "./ArtifactsItem";
import { Artifact } from "../../../common/models";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { StyledBox } from "../../../styles";
import { getStylesForStyleType } from "../../../utils/helpers";

export interface IArtifactsProps {
  /**
   * @param artifacts list of artifacts
   */
  artifacts: Artifact[] | never[];
}

export const ArtifactList = ({ artifacts }: IArtifactsProps) => {
  const { typography } = useTheme();

  const boxStyles = getStylesForStyleType({ backgroundColor: "#fff" });

  const linksContainerStyles = getStylesForStyleType({ padding: "20px 18px" });

  return (
    <StyledBox sx={boxStyles}>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3C4043" }}
              >
                Logs and Artifacts
              </Typography>
            }
          ></ListItemText>
        </ListItem>
        <Divider
          sx={{
            backgroundColor: "#E0E0E0"
          }}
        />
        <Box sx={linksContainerStyles}>
          {artifacts.map((link, index) => (
            <ListItem
              key={link.name}
              sx={{
                padding: "0",
                marginBottom: index === artifacts.length - 1 ? "0px" : "15px",
                fontFamily: typography.fontFamily
              }}
            >
              <ArtifactItem artifact={link} />
            </ListItem>
          ))}
        </Box>
      </List>
    </StyledBox>
  );
};
