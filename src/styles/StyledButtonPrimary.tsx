import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const StyledButtonPrimary = styled(Button)(({ theme: { palette } }) => ({
  padding: "0px 12px",
  border: "2px solid #000",
  fontSize: "16px",
  color: "#000",
  textTransform: "none",
  backgroundColor: palette.primary.main,
  boxShadow: "none",
  borderRadius: "5px",
  ":hover": {
    boxShadow: "none"
  }
}));

export default StyledButtonPrimary;
