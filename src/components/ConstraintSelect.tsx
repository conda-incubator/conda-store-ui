import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

interface IConstraintSelectProps {
  /**
   * TODO: this interface needs a docstring for each param
   */
  constraint: string | null;
}

export const ConstraintSelect = ({ constraint }: IConstraintSelectProps) => {
  const constraints = [">", "<", ">=", "<=", "=="];

  return (
    <Select
      defaultValue={constraint}
      IconComponent={() => null}
      sx={{
        borderRadius: "0px",
        width: "44px"
      }}
      inputProps={{
        sx: {
          padding: "7px 9px !important",
          backgroundColor: "#ECECEC",
          borderRadius: "0px"
        }
      }}
    >
      {constraints.map(constraint => (
        <MenuItem key={constraint} value={constraint}>
          {constraint}
        </MenuItem>
      ))}
    </Select>
  );
};
