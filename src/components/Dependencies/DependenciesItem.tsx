import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Dependency } from "src/common/models";
import { StyledIconButton } from "src/styles";

interface IDependenciesItemProps {
  dependency: Dependency;
  mode: "read-only" | "edit";
}

const DependenciesItem = ({ dependency, mode }: IDependenciesItemProps) => {
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
        <Typography sx={{ color: "#000" }}>{dependency.name}</Typography>
      </Box>
      <Typography
        sx={{
          color: "#000",
          width: isEditMode ? "140px" : "auto",
          marginLeft: "20px"
        }}
      >
        {dependency.version}
      </Typography>
      {isEditMode && (
        <StyledIconButton>
          <FileUploadIcon />
        </StyledIconButton>
      )}
    </Box>
  );
};

export default DependenciesItem;
