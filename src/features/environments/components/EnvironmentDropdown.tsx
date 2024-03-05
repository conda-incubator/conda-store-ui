import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useTheme from "@mui/material/styles/useTheme";
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
import { StyledAccordionSummary, StyledIconButton } from "../../../styles";
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
  const { palette } = useTheme();

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
          paddingRight: "1px"
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
              color: palette.common.black
            }}
          >
            {namespace}
          </Typography>
          <Tooltip
            title={
              canCreate
                ? `Create a new environment in the ${namespace} namespace`
                : `You do not have permission to create an environment in the ${namespace} namespace`
            }
          >
            <StyledIconButton
              style={{
                textTransform: "none",
                paddingRight: "0.4rem"
              }}
              onClick={e =>
                canCreate && onCreateNewEnvironmentTab(e, namespace)
              }
              // Do not use the `disabled` attribute. Disable manually with
              // JavaScript and the `aria-disabled` attribute, otherwise the
              // tooltip won't work. More info:
              // https://github.com/conda-incubator/conda-store-ui/pull/370/files#r1486492450
              aria-disabled={!canCreate}
            >
              <AddIcon /> New
            </StyledIconButton>
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
