import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

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
        width: "44px"
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
