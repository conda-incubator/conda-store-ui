import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledAccordionTitle = styled(Typography, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme, styleType = currentStyleType }) => ({
  fontSize: styleType === "grayscale" ? "18px" : "15px",
  fontWeight: 500
}));
