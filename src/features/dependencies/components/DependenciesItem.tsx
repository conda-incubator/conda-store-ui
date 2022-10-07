import React, { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Dependency } from "../../../common/models";
import Tooltip from "@mui/material/Tooltip";
import { StyledIconButton } from "../../../styles";

interface IDependenciesItemProps {
  /**
   * @param dependency single dependency
   * @param mode change whether we are only able to read this dependency or edit it
   * @param handleClick click handler
   */
  dependency: Dependency;
  mode: "read-only" | "edit";
  handleClick: () => void;
}

const BaseDependenciesItem = ({
  dependency,
  mode,
  handleClick
}: IDependenciesItemProps) => {
  const { name, version } = dependency;
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
        <Tooltip title="Promote as requested package" placement="right-start">
          <StyledIconButton onClick={handleClick}>
            <FileUploadIcon />
          </StyledIconButton>
        </Tooltip>
      )}
    </Box>
  );
};

const compareProps = (
  prevProps: IDependenciesItemProps,
  nextProps: IDependenciesItemProps
) => {
  return prevProps.dependency.id === nextProps.dependency.id;
};

// memoize the component, rerender only when dependency prop id has changed
export const DependenciesItem = memo(BaseDependenciesItem, compareProps);
