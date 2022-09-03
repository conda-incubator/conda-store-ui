import Box from "@mui/material/Box";
import React from "react";
import { ArtifactItem } from "./ArtifactsItem";
import { Artifact } from "src/common/models";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { StyledBox } from "src/styles";

export interface IArtifactsProps {
  /**
   * @param build_id Id of the buiild that will be active and displayed
   */
  build_id: number;
}

export const ArtifactList = ({ build_id }: IArtifactsProps) => {
  const { typography, palette } = useTheme();
  const artifactList = [
    {
      name: "Link to lockfile",
      route: `/api/v1/build/${build_id}/lockfile/`
    },
    {
      name: "Link to yml file",
      route: `/api/v1/build/${build_id}/yaml/`
    },
    {
      name: "Link to archive",
      route: `/api/v1/build/${build_id}/archive/`
    },
    {
      name: "Conda Env 1 log",
      route: `/api/v1/build/${build_id}/logs/`
    }
  ];
  const listLength = artifactList.length;

  return (
    <StyledBox>
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
        {artifactList.map((link, index) => (
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
      </List>
    </StyledBox>
  );
};
