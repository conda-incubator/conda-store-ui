import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledBox = styled(Box, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme, styleType = currentStyleType }) => ({
  border: styleType === "grayscale" ? "1px solid #000000" : "1px solid #E0E0E0",
  marginTop: "25px",
  boxShadow: "none",
  backgroundColor: styleType === "grayscale" ? "initial" : "#E6F4EA"
}));
