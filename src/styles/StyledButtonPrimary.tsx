import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const StyledButtonPrimary = styled(Button, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme: { palette } }) => ({
  padding: "4px 12px 4px 12px",
  border: palette.primary.main,
  fontSize: "14px",
  color: palette.primary.contrastText,
  textTransform: "none",
  backgroundColor: palette.primary.main,
  boxShadow: "none",
  borderRadius: "4px",
  gap: "6px",
  ":hover": {
    boxShadow: "none",
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.dark,
    textDecoration: "underline"
  },
  "&:focus": {
    outlineColor: palette.primary.main,
    outlineStyle: "auto",
    outlineOffset: "4px",
    outlineWidth: "medium",
    transition: "none"
  },
  "&:disabled": {
    backgroundColor: palette.primary.light,
    border: "none",
    color: palette.primary.contrastText
  }
}));
