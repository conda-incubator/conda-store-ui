import Box from "@mui/material/Box";
import React, { memo } from "react";
import { ArtifactItem } from "./ArtifactsItem";
import { Artifact } from "src/common/models";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

export interface IArtifactsProps {
  /**
   * @param artifacts list of artifacts
   */
  artifacts: Artifact[];
}

const BaseArtifactsList = ({ artifacts }: IArtifactsProps) => {
  const listLength = artifacts.length;
  const { typography, palette } = useTheme();
  return (
    <Box
      sx={{
        border: 1,
        minWidth: 1000,
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
      </List>
    </Box>
  );
};

// memoize the component, rerender only when the arrays from props are different
// use JSON.stringify to turn arrays into string for === check to work propertly
const compareProps = (
  prevProps: IArtifactsProps,
  nextProps: IArtifactsProps
) => {
  return (
    JSON.stringify(prevProps.artifacts) === JSON.stringify(nextProps.artifacts)
  );
};

export const ArtifactsList = memo(BaseArtifactsList, compareProps);
