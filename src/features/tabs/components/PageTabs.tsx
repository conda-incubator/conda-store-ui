import React from "react";
import { StyledTab } from "../../../styles";
import { StyledTabs } from "../../../styles/StyledTabs";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  modeChanged,
  EnvironmentDetailsModes
} from "../../../features/environmentDetails";
import {
  environmentClosed,
  tabChanged,
  closeCreateNewEnvironmentTab,
  toggleNewEnvironmentView
} from "../tabsSlice";
import { getStylesForStyleType } from "../../../utils/helpers";

export const PageTabs = () => {
  const { selectedEnvironments, value, selectedEnvironment, newEnvironment } =
    useAppSelector(state => state.tabs);

  const dispatch = useAppDispatch();

  const iconStyles = getStylesForStyleType(
    { color: "#000" },
    { color: "#3D4043" }
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (typeof newValue === "number") {
      dispatch(toggleNewEnvironmentView(false));
      dispatch(modeChanged(EnvironmentDetailsModes.READ));
      dispatch(tabChanged(newValue));
    } else {
      dispatch(toggleNewEnvironmentView(true));
      dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    envId: number
  ) => {
    e.stopPropagation();
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
    dispatch(
      environmentClosed({
        envId,
        selectedEnvironmentId: selectedEnvironment
          ? selectedEnvironment.id
          : envId
      })
    );
    if (selectedEnvironments.length === 1 && newEnvironment.isOpen) {
      dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    }
  };

  const closeNewEnvironment = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
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
              <CloseIcon sx={iconStyles} />
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
              onClick={e => closeNewEnvironment(e)}
            >
              <CloseIcon sx={iconStyles} />
            </span>
          }
          iconPosition="end"
        />
      )}
    </StyledTabs>
  );
};
