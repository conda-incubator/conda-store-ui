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
import { useGetEnviromentsQuery } from "src/features/metadata";

export enum EnvironmentDetailsModes {
  "CREAT" = "creat",
  "READ" = "read-only",
  "EDIT" = "edit"
}

interface IEnvMetadataProps {
  /**
   * @param envDescription description of the selected environment
   * @param mode change whether the component only displays the list of builds, edit the environment description or create a new description
   */
  envDescription: string;
  mode: "create" | "read-only" | "edit";
  onUpdateDescription: (value: any) => void;
}

export const EnvMetadata = ({
  envDescription,
  mode,
  onUpdateDescription
}: IEnvMetadataProps) => {
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
      <Description
        mode={mode}
        description={envDescription}
        onChangeDescription={onUpdateDescription}
      />
      {enviromentData &&
        (mode === EnvironmentDetailsModes.READ ||
          mode === EnvironmentDetailsModes.EDIT) && (
          <EnvBuilds data={enviromentData} />
        )}
    </StyledBox>
  );
};
