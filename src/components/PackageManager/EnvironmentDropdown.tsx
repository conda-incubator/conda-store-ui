import React from "react";
import Accordion from "@mui/material/Accordion";
import { StyledAccordionExpandIcon, StyledAccordionSummary } from "src/styles";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import { Environment as EnvironmentModel } from "src/common/models";
import { Environment } from "./Environment";

interface IEnvironmentDropdownProps {
  list: EnvironmentModel[];
  namespace: { id: number; name: string };
}

export const EnvironmentDropdown = ({
  list,
  namespace
}: IEnvironmentDropdownProps) => {
  const filteredEnvironmentsList = list.filter(
    environment => environment.namespace.name === namespace.name
  );

  return (
    <Accordion
      sx={{ border: "none", position: "initial" }}
      elevation={0}
      disableGutters
    >
      <StyledAccordionSummary
        sx={{
          flexDirection: "row-reverse",
          paddingLeft: "0px",
          border: "none"
        }}
        expandIcon={<StyledAccordionExpandIcon />}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "226px" }}>{namespace.name}</Typography>
          <IconButton>
            <AddIcon sx={{ width: "15px", height: "15px", color: "#2B2B2B" }} />
          </IconButton>
        </Box>
      </StyledAccordionSummary>
      <AccordionDetails
        sx={{ paddingLeft: "42px", paddingTop: "5px", paddingBottom: "0px" }}
      >
        <List sx={{ padding: "0px" }}>
          {filteredEnvironmentsList.map(environment => (
            <Box key={environment.id} sx={{ marginBottom: "20px" }}>
              <Environment environment={environment} />
            </Box>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
