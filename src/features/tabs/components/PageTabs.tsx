import React from "react";
import { StyledTab } from "src/styles";
import { StyledTabs } from "src/styles/StyledTabs";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { environmentClosed, valueChanged } from "../tabsSlice";

export const PageTabs = () => {
  const { selectedEnvironments, value } = useAppSelector(state => state.tabs);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(valueChanged(newValue));
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
              onClick={e => {
                e.stopPropagation();
                dispatch(environmentClosed(env.id));
              }}
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
