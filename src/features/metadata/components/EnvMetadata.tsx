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
import { useGetEnviromentBuildsQuery } from "src/features/metadata";

export enum EnvironmentDetailsModes {
  "CREATE" = "create",
  "READ" = "read-only",
  "EDIT" = "edit"
}

interface IEnvMetadataProps {
  /**
   * @param envDescription description of the selected environment
   * @param mode change whether the component only displays the list of builds, edit the environment description or create a new description
   */
  selectedEnv: any;
  mode: "create" | "read-only" | "edit";
}

export const EnvMetadata = ({ selectedEnv, mode }: IEnvMetadataProps) => {
  const current_build_id = selectedEnv.current_build_id;
  const { data: enviromentBuilds } = useGetEnviromentBuildsQuery(selectedEnv);
  const { palette } = useTheme();

  const [description, setDescription] = useState(selectedEnv?.description);

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
        description={description}
        onChangeDescription={setDescription}
      />
      {enviromentBuilds &&
        (mode === EnvironmentDetailsModes.READ ||
          mode === EnvironmentDetailsModes.EDIT) && (
          <EnvBuilds
            data={enviromentBuilds}
            current_build_id={current_build_id}
          />
        )}
    </StyledBox>
  );
};
