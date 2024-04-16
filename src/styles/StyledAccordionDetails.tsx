import React from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/system";
import { PrefContext } from "../preferences";

export const StyledAccordionDetails = styled(AccordionDetails, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(
  ({
    theme: { palette },
    styleType = React.useContext(PrefContext).styleType
  }) => ({
    border:
      styleType === "grayscale"
        ? `1px solid ${palette.secondary.light}`
        : "1px solid #BCBFC4",
    borderTop: "none",
    borderRadius: styleType === "grayscale" ? "0px 0px 5px 5px" : "Opx",
    overflowY: "scroll",
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: styleType === "grayscale" ? "#EBECEE" : "#DADCE0",
      borderRadius: "5px",
      border: styleType === "grayscale" ? "1px solid #666666" : "none"
    }
  })
);
