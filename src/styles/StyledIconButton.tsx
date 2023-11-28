import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const StyledIconButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: "0px",
  padding: "0px",
  minWidth: "auto",
  ":hover": {
    boxShadow: "none",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary[50]
  },
  "&:focus": {
    outlineColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary[50],
    outlineStyle: "auto",
    outlineWidth: "medium",
    transition: "none"
  },
  "&:disabled": {
    backgroundColor: theme.palette.secondary[100],
    border: "none",
    color: theme.palette.secondary[300]
  }
}));
