import React from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { EnvironmentDetailsModes } from "../../../features/environmentDetails";
import { CustomizedTextField } from "../../../components";

interface IDescriptionProps {
  /**
   * @param mode change whether the component only displays the list or we are able to edit it
   */
  mode: "create" | "read-only" | "edit";
  description: string;
  onChangeDescription: (description: string) => void;
}

export const Description = ({
  mode,
  description,
  onChangeDescription
}: IDescriptionProps) => {
  const { palette } = useTheme();

  return (
    <Box width="100%">
      {mode === EnvironmentDetailsModes.READ && description && (
        <StyledMetadataItem>{description}</StyledMetadataItem>
      )}

      {mode !== EnvironmentDetailsModes.READ && (
        <CustomizedTextField
          multiline
          label="Description"
          value={description}
          placeholder="Enter here the description of your environment"
          fullWidth
          sx={{
            backgroundColor: palette.grey[100],
            marginBottom: "10px"
          }}
          inputProps={{
            style: {
              fontSize: "13px"
            }
          }}
          onChange={e => onChangeDescription(e.target.value)}
        />
      )}
    </Box>
  );
};
