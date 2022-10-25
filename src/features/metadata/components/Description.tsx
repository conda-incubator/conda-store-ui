import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { StyledMetadataItem } from "../../../styles/StyledMetadataItem";
import { EnvironmentDetailsModes } from "../../../features/environmentDetails";

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
  return (
    <Box>
      {mode === EnvironmentDetailsModes.READ ? (
        <StyledMetadataItem>{description}</StyledMetadataItem>
      ) : (
        <>
          <StyledMetadataItem
            sx={{
              fontWeight: 500,
              paddingBottom: "0",
              color: "#3C4043"
            }}
          >
            Description:
          </StyledMetadataItem>
          <Box
            style={{
              padding: "11px 14px"
            }}
          >
            <TextField
              multiline
              value={description}
              placeholder="Enter here the description of your environment"
              sx={{
                backgroundColor: "#F1F1F1",
                width: "100%",
                fontSize: "14px"
              }}
              onChange={e => onChangeDescription(e.target.value)}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
