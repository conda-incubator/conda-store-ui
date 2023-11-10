import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const StyledListItem = styled(Button)(({ theme }) => ({
  color: theme.palette.common.black,
  borderRadius: "0px",
  padding: "0px",
  minWidth: "auto",
  ":hover": {
    boxShadow: "none",
    textDecoration: "underline",
    textUnderlineOffset: "0.3em"
  }
}));
