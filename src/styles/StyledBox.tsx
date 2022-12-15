import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { PrefContext } from "../preferences";

export const StyledBox = styled(Box, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(
  ({ theme, styleType = React.useContext(PrefContext).styleType }) => ({
    border: "1px solid #E0E0E0",
    marginTop: "25px",
    boxShadow: "none",
    backgroundColor: styleType === "grayscale" ? "#EBECEE" : "#E6F4EA"
  })
);
