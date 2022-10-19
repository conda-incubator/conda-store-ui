import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

export const StyledAccordionTitle = styled(Typography, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme, styleType = "green-accent" }) => ({
  fontSize: styleType === "grayscale" ? "18px" : "15px",
  fontWeight: 500
}));
