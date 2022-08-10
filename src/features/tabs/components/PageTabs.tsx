import React from "react";
import { StyledTab } from "src/styles";
import { StyledTabs } from "src/styles/StyledTabs";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { environmentClosed, tabChanged } from "../tabsSlice";

export const PageTabs = () => {
  const { selectedEnvironments, value, selectedEnvironment } = useAppSelector(
    state => state.tabs
  );

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(tabChanged(newValue));
  };

  return (
    <StyledTabs
      TabIndicatorProps={{
        style: {
          display: "none"
        }
      }}
      value={value}
      onChange={handleChange}
      variant="fullWidth"
    >
      {selectedEnvironments.map(env => (
        <StyledTab
          key={env.id}
          label={env.name}
          value={env.id}
          wrapped
          icon={
            <span
              style={{ marginTop: "5px" }}
              role="button"
              onClick={e => {
                e.stopPropagation();
                dispatch(
                  environmentClosed({
                    envId: env.id,
                    selectedEnvironmentId: selectedEnvironment!.id
                  })
                );
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
