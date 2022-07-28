import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Dependency } from "../../../common/models";
import { StyledIconButton } from "../../../styles";

interface IDependenciesItemProps {
  dependency: Dependency;
  mode: "read-only" | "edit";
  onClick: (id: number) => void;
}

export const DependenciesItem = ({
  dependency,
  mode,
  onClick
}: IDependenciesItemProps) => {
  const { id, name, version } = dependency;
  const isEditMode = mode === "edit";

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "300px" }}>
        <SquareIcon
          sx={{
            color: "#000",
            width: 10,
            height: 10,
            marginRight: "12px"
          }}
        />
        <Typography sx={{ color: "#000" }}>{name}</Typography>
      </Box>
      <Typography
        sx={{
          color: "#000",
          width: isEditMode ? "140px" : "auto",
          marginLeft: isEditMode ? "20px" : "0px"
        }}
      >
        {version}
      </Typography>
      {isEditMode && (
        <StyledIconButton onClick={() => onClick(id)}>
          <FileUploadIcon />
        </StyledIconButton>
      )}
    </Box>
  );
};
