import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

import useTheme from "@mui/material/styles/useTheme";

interface IConstraintSelectProps {
  /**
   * @param constraint package version constraint
   */
  constraint: string | null;
  onUpdate?: (value: string) => void;
}

export const ConstraintSelect = ({
  constraint,
  onUpdate = (value: string) => {}
}: IConstraintSelectProps) => {
  const constraints = ["=", ">", "<", ">=", "<="];
  const selectedConstraint = constraint === "==" ? "=" : constraint;
  const { palette } = useTheme();

  return (
    <Select
      defaultValue={selectedConstraint}
      IconComponent={() => null}
      onChange={e => {
        if (e.target.value) {
          onUpdate(e.target.value);
        }
      }}
      sx={{
        borderRadius: "0px",
        width: "44px",
        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.secondary.main,
          transition: "none"
        },
        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: palette.accent.main,
            transition: "none"
          }
      }}
      notched={false}
      inputProps={{
        sx: {
          padding: "7px 9px !important",
          borderRadius: "0px",
          "&::placeholder": {
            fontSize: "14px",
            fontWeight: 400
          }
        },
        "data-testid": "ConstraintSelectTest"
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
