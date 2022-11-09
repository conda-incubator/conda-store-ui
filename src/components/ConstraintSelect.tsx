import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { getStylesForStyleType } from "../utils/helpers";

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
  const constraints = [">", "<", ">=", "<=", "=="];

  const inputStyles = getStylesForStyleType(
    {
      padding: "7px 9px !important",
      backgroundColor: "#ECECEC",
      borderRadius: "0px"
    },
    {
      padding: "7px 9px !important",
      backgroundColor: "#fff",
      borderRadius: "0px"
    }
  );

  return (
    <Select
      defaultValue={constraint}
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
      inputProps={{
        sx: inputStyles,
        "data-testid": "test-select"
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
