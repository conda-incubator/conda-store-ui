import React, { memo } from "react";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { Dependency } from "../../../common/models";
import Tooltip from "@mui/material/Tooltip";
import { StyledIconButton } from "../../../styles";
import { UploadIcon } from "../../../components";

interface IDependenciesItemProps {
  /**
   * @param dependency single dependency
   * @param mode change whether we are only able to read this dependency or edit it
   * @param handleClick click handler
   */
  dependency: Dependency;
  mode: "read-only" | "edit";
  isLast: boolean;
  handleClick: () => void;
}

const BaseDependenciesItem = ({
  dependency,
  mode,
  isLast,
  handleClick
}: IDependenciesItemProps) => {
  const { name, version } = dependency;
  const isEditMode = mode === "edit";

  return (
    <>
      <TableCell
        sx={{
          fontSize: "13px",
          color: "#333",
          borderBottom: isLast ? "none" : undefined
        }}
      >
        {name}
      </TableCell>
      <TableCell
        sx={{ textAlign: "right", borderBottom: isLast ? "none" : undefined }}
      >
        <Typography
          sx={{
            color: "#333",
            fontSize: "13px"
          }}
        >
          {version}
          {isEditMode && (
            <>
              &nbsp;
              <Tooltip
                title="Promote as requested package"
                placement="right-start"
              >
                <StyledIconButton
                  onClick={handleClick}
                  data-testid="PromoteIcon"
                >
                  <UploadIcon />
                </StyledIconButton>
              </Tooltip>
            </>
          )}
        </Typography>
      </TableCell>
    </>
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
