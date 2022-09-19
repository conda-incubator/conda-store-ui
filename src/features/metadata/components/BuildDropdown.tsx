import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";

interface IBuildProps {
  /**
   * @param builds list of builds
   */
  builds: {
    id: number;
    name: string;
  }[];
}

export const Build = ({ builds }: IBuildProps) => {
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Select
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      sx={{ marginLeft: "13px" }}
      value={builds && builds.length > 0 ? builds[0].name : ""}
      IconComponent={() => (
        <IconButton
          sx={{ padding: "0px" }}
          onClick={() => setOpen(currState => !currState)}
        >
          <ArrowDropDownIcon
            sx={{
              height: "37px",
              borderLeft: `1px solid  ${palette.primary.main}`
            }}
          />
        </IconButton>
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
            <MenuItem key={build.id} value={build.name}>
              {build.name}
            </MenuItem>
          ))
        : null}
    </Select>
  );
};
