import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useTheme from "@mui/material/styles/useTheme";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";

interface IVersionSelectProps {
  /**
   * @param version package version
   */
  version: string | null;
}

export const VersionSelect = ({ version }: IVersionSelectProps) => {
  const { palette } = useTheme();
  const versions = ["1.0.0", "5.8.0", "15.0.0", "20.13.15"];
  const [open, setOpen] = useState(false);

  if (version) {
    versions.push(version);
  }

  return (
    <Select
      defaultValue={version ?? ""}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      IconComponent={() => (
        <IconButton
          sx={{ padding: "0px" }}
          onClick={() => setOpen(currState => !currState)}
        >
          <ArrowDropDownIcon
            sx={{
              backgroundColor: "#ECECEC",
              height: "37px",
              borderLeft: `2px solid  ${palette.primary.main}`
            }}
          />
        </IconButton>
      )}
      sx={{
        borderRadius: "0px",
        width: "110px",
        border: "none"
      }}
      inputProps={{
        sx: {
          padding: "7px 9px !important",
          backgroundColor: "#ECECEC",
          borderRadius: "0px"
        }
      }}
    >
      {versions.map(version => (
        <MenuItem key={version} value={version}>
          {version}
        </MenuItem>
      ))}
    </Select>
  );
};
