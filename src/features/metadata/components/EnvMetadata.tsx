import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

import { EnvBuilds, Description } from "../../../features/metadata/components";
import { StyledBox } from "../../../styles";
import { getStylesForStyleType } from "../../../utils/helpers";

export enum EnvironmentDetailsModes {
  "CREATE" = "create",
  "READ" = "read-only",
  "EDIT" = "edit"
}
interface IEnvMetadataProps {
  /**
   * @param mode change whether the component only displays the list of builds, edit the environment description or create a new description
   * @param onUpdateDescription change environment description
   */
  description?: any;
  mode: "create" | "read-only" | "edit";
  current_build_id: number | undefined;
  onUpdateDescription: (description: string) => void;
}

export const EnvMetadata = ({
  mode,
  description = "",
  current_build_id,
  onUpdateDescription
}: IEnvMetadataProps) => {
  const { palette } = useTheme();

  const boxStyles = getStylesForStyleType(
    {},
    { backgroundColor: "#E6F4EA", border: "1px solid #E0E0E0" }
  );

  return (
    <StyledBox sx={boxStyles}>
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
      <Description
        mode={mode}
        description={description || undefined}
        onChangeDescription={onUpdateDescription}
      />
      {mode !== EnvironmentDetailsModes.CREATE && current_build_id && (
        <EnvBuilds currentBuildId={current_build_id} />
      )}
    </StyledBox>
  );
};
