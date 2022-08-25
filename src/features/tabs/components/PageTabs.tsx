import React from "react";
import { StyledTab } from "src/styles";
import { StyledTabs } from "src/styles/StyledTabs";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "src/hooks";
import {
  environmentClosed,
  tabChanged,
  closeCreateNewEnvironmentTab,
  toggleNewEnvironmentView
} from "../tabsSlice";

export const PageTabs = () => {
  const { selectedEnvironments, value, selectedEnvironment, newEnvironment } =
    useAppSelector(state => state.tabs);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (typeof newValue === "number") {
      dispatch(toggleNewEnvironmentView(false));
      dispatch(tabChanged(newValue));
    } else {
      dispatch(toggleNewEnvironmentView(true));
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    envId: number
  ) => {
    e.stopPropagation();

    dispatch(
      environmentClosed({
        envId,
        selectedEnvironmentId: selectedEnvironment
          ? selectedEnvironment.id
          : envId
      })
    );
  };

  const closeNewEnvironment = () => {
    dispatch(closeCreateNewEnvironmentTab());
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
              onClick={e => handleClick(e, env.id)}
            >
              <CloseIcon sx={{ color: "#000" }} />
            </span>
          }
          iconPosition="end"
        />
      ))}
      {newEnvironment.isOpen && (
        <StyledTab
          key="create"
          label="Create Environment"
          value="create"
          wrapped
          icon={
            <span
              style={{ marginTop: "5px" }}
              role="button"
              onClick={e => closeNewEnvironment()}
            >
              <CloseIcon sx={{ color: "#000" }} />
            </span>
          }
          iconPosition="end"
        />
      )}
    </StyledTabs>
  );
};
