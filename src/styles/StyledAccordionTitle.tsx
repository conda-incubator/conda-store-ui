import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

export const StyledAccordionTitle = styled(Typography, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 500,
  color: "#333"
}));
