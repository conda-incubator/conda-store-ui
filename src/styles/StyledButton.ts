import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const StyledButton = styled(Button, {
  shouldForwardProp: prop => prop !== "styleType",
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary
  ]
})<{ styleType?: string }>(({ theme, color = "primary" }) => {
  const palette = theme.palette[color];
  const {
    palette: { secondary }
  } = theme;

  return {
    padding: "4px 12px 4px 12px",
    border: palette.main,
    fontSize: "14px",
    color: palette.contrastText,
    textTransform: "none",
    backgroundColor: palette.main,
    boxShadow: "none",
    borderRadius: "4px",
    gap: "6px",
    ":hover": {
      boxShadow: "none",
      color: palette.contrastText,
      backgroundColor: palette.dark,
      textDecoration: "underline",
      textUnderlineOffset: "0.3em"
    },
    "&:focus": {
      outlineColor: palette.main,
      outlineStyle: "auto",
      outlineOffset: "4px",
      outlineWidth: "medium",
      transition: "none"
    },
    "&:disabled": {
      backgroundColor: secondary[100],
      border: "none",
      color: secondary.light
    }
  };
});
