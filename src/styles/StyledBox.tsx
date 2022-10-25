import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledBox = styled(Box, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme, styleType = currentStyleType }) => ({
  border: "1px solid #E0E0E0",
  marginTop: "25px",
  boxShadow: "none",
  backgroundColor: styleType === "grayscale" ? "#EBECEE" : "#E6F4EA"
}));
