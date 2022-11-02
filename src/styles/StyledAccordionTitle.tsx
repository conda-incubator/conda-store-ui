import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledAccordionTitle = styled(Typography, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme, styleType = currentStyleType }) => ({
  fontSize: "15px",
  fontWeight: 500,
  color: styleType === "grayscale" ? "#000" : "#3C4043"
}));
