import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface IVersionSelectProps {
  version: string | null;
}

const VersionSelect = ({ version }: IVersionSelectProps) => {
  const versions = ["1.0.0", "5.8.0", "15.0.0", "20.13.15"];

  if (version) versions.push(version);

  return (
    <Select
      defaultValue={version}
      IconComponent={() => (
        <ArrowDropDownIcon
          sx={{
            backgroundColor: "#ECECEC",
            height: "37px",
            borderLeft: "2px solid  #C4C4C4",
          }}
        />
      )}
      sx={{
        borderRadius: "0px",
        width: "110px",
        border: "none",
      }}
      inputProps={{
        sx: {
          padding: "7px 9px !important",
          backgroundColor: "#ECECEC",
          borderRadius: "0px",
        },
      }}
    >
      {versions.map((version) => (
        <MenuItem key={version} value={version}>
          {version}
        </MenuItem>
      ))}
    </Select>
  );
};

export default VersionSelect;
