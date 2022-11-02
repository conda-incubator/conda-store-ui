import React, { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dependency } from "../../../common/models";
import Tooltip from "@mui/material/Tooltip";
import { StyledIconButton } from "../../../styles";
import { getIconForStyleType } from "../../../utils/helpers";
import { SquareIconAlt, UploadIcon } from "../../../components";

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

  const icon = getIconForStyleType(
    <></>,
    <SquareIconAlt style={{ marginRight: "8px" }} />
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "300px" }}>
        {icon}
        <Typography sx={{ fontSize: "14px", color: "#3C4043" }}>
          {name}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "#3C4043",
          width: isEditMode ? "140px" : "auto",
          marginLeft: isEditMode ? "20px" : "0px",
          fontSize: "14px"
        }}
      >
        {version}
      </Typography>
      {isEditMode && (
        <Tooltip title="Promote as requested package" placement="right-start">
          <StyledIconButton onClick={handleClick} data-testid="PromoteIcon">
            <UploadIcon />
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
