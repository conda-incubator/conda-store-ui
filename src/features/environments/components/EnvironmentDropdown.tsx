import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AddIcon from "@mui/icons-material/Add";
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
import {
  StyledAccordionExpandIcon,
  StyledAccordionSummary
} from "../../../styles";
import { getStylesForStyleType } from "../../../utils/helpers";
import {
  environmentAddIconGrayscaleStyles,
  environmentAddIconGreenAccentStyles
} from "../styles";

interface IEnvironmentDropdownProps {
  /**
   * @param data object containing the namespace information and the list of environments that belong to it
   */
  data: INamespaceEnvironments;
}

export const EnvironmentDropdown = ({
  data: { namespace, environments }
}: IEnvironmentDropdownProps) => {
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const addIconStyles = getStylesForStyleType(
    environmentAddIconGrayscaleStyles,
    environmentAddIconGreenAccentStyles
  );

  const titleStyles = getStylesForStyleType(
    { width: "217px" },
    { width: "217px", fontWeight: 700, fontSize: "15px", color: "#9AA0A6" }
  );

  const onCreateNewEnvironmentTab = (
    event: React.SyntheticEvent,
    namespace: string
  ) => {
    if (isExpanded) {
      event.stopPropagation();
    }
    dispatch(modeChanged(EnvironmentDetailsModes.CREATE));
    dispatch(openCreateNewEnvironmentTab(namespace));
  };

  return (
    <Accordion
      sx={{ border: "none", position: "initial" }}
      elevation={0}
      expanded={isExpanded}
      disableGutters
      onChange={() => setIsExpanded(!isExpanded)}
    >
      <StyledAccordionSummary
        sx={{
          flexDirection: "row-reverse",
          paddingLeft: "16px",
          border: "none"
        }}
        expandIcon={<StyledAccordionExpandIcon />}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={titleStyles}>{namespace}</Typography>
          <IconButton onClick={e => onCreateNewEnvironmentTab(e, namespace)}>
            <AddIcon sx={addIconStyles} />
          </IconButton>
        </Box>
      </StyledAccordionSummary>
      <AccordionDetails
        sx={{ paddingLeft: "42px", paddingTop: "5px", paddingBottom: "0px" }}
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
                      selectedEnvironmentId: selectedEnvironment?.id
                    })
                  );
                  dispatch(modeChanged(EnvironmentDetailsModes.READ));
                  dispatch(toggleNewEnvironmentView(false));
                }}
                environment={environment}
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
