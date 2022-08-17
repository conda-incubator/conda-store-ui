import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { Build, Description } from "src/features/metadata";
import { StyledBox } from "src/styles";
import { StyledMetadataItem } from "src/styles/StyledMetadataItem";
import {
  useGetEnviromentsQuery,
  useUpdateEnvironmentMutation
} from "src/features/metadata";
import { useAppSelector } from "src/hooks";
import { buildMapper } from "src/utils/helpers/buildMapper";

interface IEnvMetadataProps {
  /**
   * @param mode change whether the component only displays the list of builds or edit the environment description
   */
  mode: "read-only" | "edit";
}

export const EnvMetadata = ({ mode }: IEnvMetadataProps) => {
  const { palette } = useTheme();
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const { data: enviromentData } = useGetEnviromentsQuery();
  const [updateEnvironment] = useUpdateEnvironmentMutation();

  const [description, setDescription] = useState(
    "Description (this area will hold metadata): This area will hold the meta data: Lorem ipsum dolor sit amet. Non iure sunt id aliquam asperiores sed blanditiis vero et dolores placeat est pariatur nulla."
  );

  const onUpdateEnvironmentDescription = async () => {
    try {
      const namespace = selectedEnvironment?.namespace.name;
      const name = selectedEnvironment?.name;
      await updateEnvironment({ namespace, name, description }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

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
