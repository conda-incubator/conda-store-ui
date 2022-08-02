import React, { useState } from "react";
import { StyledTab } from "src/styles";
import { StyledTabs } from "src/styles/StyledTabs";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { environmentClosed } from "../tabsSlice";

export const PageTabs = () => {
  const { selectedEnvironments } = useAppSelector(state => state.tabs);
  const [value, setValue] = useState(0);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledTabs
      TabIndicatorProps={{
        style: {
          transition: "none"
        }
      }}
      value={value}
      onChange={handleChange}
    >
      {selectedEnvironments.map(env => (
        <StyledTab
          key={env.id}
          label={env.name}
          value={env.id}
          icon={
            <span
              style={{ marginTop: "5px" }}
              role="button"
              onClick={() => dispatch(environmentClosed(env.id))}
            >
              <CloseIcon sx={{ color: "#000" }} />
            </span>
          }
          iconPosition="end"
        />
      ))}
    </StyledTabs>
  );
};
