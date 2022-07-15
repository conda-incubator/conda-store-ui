import React from "react";
import Accordion from "@mui/material/Accordion";
import { StyledAccordionExpandIcon, StyledAccordionSummary } from "src/styles";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const EnvironmentDropdown = () => {
  return (
    <Accordion sx={{ border: "none" }} elevation={0} disableGutters>
      <StyledAccordionSummary
        sx={{
          flexDirection: "row-reverse",
          paddingLeft: "0px",
          border: "none"
        }}
        expandIcon={<StyledAccordionExpandIcon />}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "226px" }}>Client A</Typography>
          <IconButton>
            <AddIcon sx={{ width: "15px", height: "15px", color: "#2B2B2B" }} />
          </IconButton>
        </Box>
      </StyledAccordionSummary>
    </Accordion>
  );
};
