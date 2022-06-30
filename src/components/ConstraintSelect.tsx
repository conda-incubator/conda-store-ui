import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

interface IConstraintSelectProps {
  constraint: string | null;
}

const ConstraintSelect = ({ constraint }: IConstraintSelectProps) => {
  const constraints = [">", "<", ">=", "<=", "=="];

  return (
    <Select
      defaultValue={constraint}
      IconComponent={() => null}
      sx={{
        borderRadius: "0px",
        width: "44px",
      }}
      inputProps={{
        sx: {
          padding: "5px 9px !important",
          border: "2px solid #C4C4C4",
          backgroundColor: "#ECECEC",
          borderRadius: "0px",
        },
      }}
    >
      {constraints.map((constraint) => (
        <MenuItem key={constraint} value={constraint}>
          {constraint}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ConstraintSelect;
