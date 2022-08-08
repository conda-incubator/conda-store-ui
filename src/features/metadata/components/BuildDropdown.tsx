import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface IBuildProps {
  /**
   * @param builds list of builds
   */
  builds: string[] | null;
}

export const Build = ({ builds }: IBuildProps) => {
  const { palette } = useTheme();
  return (
    <Select
      sx={{ marginLeft: "13px" }}
      defaultValue={builds ? builds[builds.length - 1] : null}
      IconComponent={() => (
        <ArrowDropDownIcon
          sx={{
            height: "37px",
            borderLeft: `1px solid  ${palette.primary.main}`
          }}
        />
      )}
      inputProps={{
        "data-testid": "test-select",
        sx: {
          padding: "7px 9px !important"
        }
      }}
    >
      {builds
        ? builds.map(build => (
            <MenuItem key={build} value={build}>
              {build}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};