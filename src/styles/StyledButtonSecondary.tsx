import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const StyledButtonSecondary = styled(Button, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme: { palette } }) => ({
  padding: "4px 12px 4px 12px",
  border: palette.secondary.main,
  fontSize: "14px",
  color: palette.secondary.contrastText,
  textTransform: "none",
  backgroundColor: palette.secondary.main,
  boxShadow: "none",
  borderRadius: "4px",
  gap: "6px",
  ":hover": {
    boxShadow: "none",
    color: palette.secondary.contrastText,
    backgroundColor: palette.secondary.dark,
    textDecoration: "underline",
    textUnderlineOffset: "0.3em"
  },
  "&:focus": {
    outlineColor: palette.secondary.main,
    outlineStyle: "auto",
    outlineOffset: "4px",
    outlineWidth: "medium",
    transition: "none"
  },
  "&:disabled": {
    backgroundColor: palette.secondary[100],
    border: "none",
    color: palette.secondary.light
  }
}));
