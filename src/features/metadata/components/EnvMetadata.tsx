/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { EnvBuilds, Description } from "src/features/metadata/components";
import { StyledBox } from "src/styles";

export enum EnvironmentDetailsModes {
  "CREATE" = "create",
  "READ" = "read-only",
  "EDIT" = "edit"
}
interface IEnvMetadataProps {
  /**
   * @param selectedEnv Selected environment's information
   * @param mode change whether the component only displays the list of builds, edit the environment description or create a new description
   * @param onUpdateDescription change environment description
   */
  selectedEnv: any;
  description: any;
  mode: "create" | "read-only" | "edit";
  current_build_id: number;
  onUpdateDescription: (description: string) => void;
}

export const EnvMetadata = ({
  selectedEnv,
  description,
  mode,
  current_build_id,
  onUpdateDescription
}: IEnvMetadataProps) => {
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
      <Description
        mode={mode}
        description={description || undefined}
        onChangeDescription={onUpdateDescription}
      />
      {mode !== EnvironmentDetailsModes.CREATE && selectedEnv && (
        <EnvBuilds data={selectedEnv} currentBuildId={current_build_id} />
      )}
    </StyledBox>
  );
};
