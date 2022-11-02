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
  const listLength = artifacts.length;
  const { typography, palette } = useTheme();

  const dividerStyles = getStylesForStyleType(
    { bgcolor: palette.primary.main },
    {}
  );

  const titleStyles = getStylesForStyleType(
    { fontSize: "21px", fontWeight: 400 },
    { fontSize: "15px", fontWeight: 400, color: "#3C4043" }
  );

  const boxStyles = getStylesForStyleType({}, { backgroundColor: "#fff" });

  const linksContainerStyles = getStylesForStyleType(
    {},
    { padding: "5px 16px" }
  );

  return (
    <StyledBox sx={boxStyles}>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography sx={titleStyles}>Logs and Artifacts</Typography>
            }
          ></ListItemText>
        </ListItem>
        <Divider sx={dividerStyles} />
        <Box sx={linksContainerStyles}>
          {artifacts.map((link, index) => (
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
                <ArtifactItem artifact={link} />
              </Box>
            </ListItem>
          ))}
        </Box>
      </List>
    </StyledBox>
  );
};
