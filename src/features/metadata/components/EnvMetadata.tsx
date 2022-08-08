import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { Build } from "src/features/metadata/components/BuildDropdown";
import { StyledBox } from "src/styles";
import { StyledMetadataItem } from "src/styles/StyledMetadataItem";

export interface IEnvMetadataProps {
  /**
   * @param builds list of builds
   */
  builds: {
    id: number;
    name: string;
  }[];
}

export const EnvMetadata = ({ builds }: IEnvMetadataProps) => {
  const { palette } = useTheme();
  return (
    <StyledBox>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: "21px", fontWeight: 400 }}>
                Environment Metadata
              </Typography>
            }
          ></ListItemText>
        </ListItem>
        <Divider sx={{ bgcolor: palette.primary.main }} />
      </List>
      <StyledMetadataItem>
        <b>Description (this area will hold metadata):</b> This area will hold
        the meta data: Lorem ipsum dolor sit amet. Non iure sunt id aliquam
        asperiores sed blanditiis vero et dolores placeat est pariatur nulla.
      </StyledMetadataItem>
      <StyledMetadataItem>
        <b>Build</b>
      </StyledMetadataItem>
      <Build builds={builds} />
      <StyledMetadataItem>
        <b>Status:</b> Completed/Building/Failed
      </StyledMetadataItem>
    </StyledBox>
  );
};
