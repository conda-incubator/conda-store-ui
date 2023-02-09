import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Environment } from "./Environment";
import { INamespaceEnvironments } from "../../../common/interfaces";
import {
  modeChanged,
  EnvironmentDetailsModes
} from "../../../features/environmentDetails";
import {
  environmentOpened,
  openCreateNewEnvironmentTab,
  toggleNewEnvironmentView
} from "../../../features/tabs";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { StyledAccordionSummary } from "../../../styles";
import { getStylesForStyleType } from "../../../utils/helpers";
import {
  environmentAddIconGrayscaleStyles,
  environmentAddIconGreenAccentStyles
} from "../styles";
import { ArrowIcon } from "../../../components";

interface IEnvironmentDropdownProps {
  /**
   * @param data object containing the namespace information and the list of environments that belong to it
   */
  data: INamespaceEnvironments;
}

export const EnvironmentDropdown = ({
  data: { namespace, environments, canCreate, canUpdate }
}: IEnvironmentDropdownProps) => {
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const addIconStyles = getStylesForStyleType(
    environmentAddIconGrayscaleStyles,
    environmentAddIconGreenAccentStyles
  );

  const onCreateNewEnvironmentTab = (
    event: React.SyntheticEvent,
    namespace: string
  ) => {
    if (!canCreate) {
      event.stopPropagation();
      return;
    }

    if (isExpanded) {
      event.stopPropagation();
    }
    dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    dispatch(openCreateNewEnvironmentTab(namespace));
  };

  return (
    <Accordion
      sx={{
        border: "none",
        position: "initial",
        backgroundColor: "transparent"
      }}
      elevation={0}
      expanded={isExpanded}
      disableGutters
      onChange={() => setIsExpanded(!isExpanded)}
    >
      <StyledAccordionSummary
        sx={{
          flexDirection: "row-reverse",
          border: "none",
          paddingRight: 0
        }}
        expandIcon={<ArrowIcon />}
      >
        <Box
          sx={{
            width: "100%",
            marginLeft: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              color: " #333"
            }}
          >
            {namespace}
          </Typography>
          <Tooltip
            title={
              canCreate
                ? "Create a new environment"
                : "You do not have permission to create an environment"
            }
          >
            <IconButton onClick={e => onCreateNewEnvironmentTab(e, namespace)}>
              <AddIcon
                sx={{
                  ...addIconStyles,
                  ...(!canCreate && { color: "#e5e5e5" })
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </StyledAccordionSummary>
      <AccordionDetails
        sx={{ paddingLeft: "30px", paddingTop: "5px", paddingBottom: "0px" }}
      >
        <List sx={{ padding: "0px" }}>
          {environments.map(environment => (
            <ListItem
              key={environment.id}
              disablePadding
              sx={{ marginBottom: "20px" }}
            >
              <Environment
                onClick={() => {
                  dispatch(
                    environmentOpened({
                      environment,
                      selectedEnvironmentId: selectedEnvironment?.id,
                      canUpdate
                    })
                  );
                  dispatch(modeChanged(EnvironmentDetailsModes.READ));
                  dispatch(toggleNewEnvironmentView(false));
                }}
                environment={environment}
                selectedEnvironmentId={selectedEnvironment?.id}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
