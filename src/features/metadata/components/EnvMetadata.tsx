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
import { useGetEnviromentsQuery } from "src/features/metadata";
import { buildMapper } from "src/utils/helpers/buildMapper";

export interface IEnvMetadataProps {
  /**
   * @param description description of the selected environment
   */
  description: string;
}

export const EnvMetadata = ({ description }: IEnvMetadataProps) => {
  const { data: enviromentData } = useGetEnviromentsQuery();
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
        <b>Description (this area will hold metadata):</b> {description}
      </StyledMetadataItem>
      <StyledMetadataItem>
        <b>Build</b>
      </StyledMetadataItem>
      {enviromentData && <Build builds={buildMapper(enviromentData)} />}
      <StyledMetadataItem>
        <b>Status:</b> Completed/Building/Failed
      </StyledMetadataItem>
    </StyledBox>
  );
};
