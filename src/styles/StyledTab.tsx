import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";

export const StyledTab = styled(Tab)(({ theme: { palette } }) => ({
  border: "transparent",
  padding: "7px 12px",
  textTransform: "none",
  fontSize: "20px",
  minHeight: "48px",
  maxHeight: "48px",
  maxWidth: "340px",
  justifyContent: "space-between",
  "&.Mui-selected": {
    color: "#000",
    fontWeight: 500,
    borderTop: "1px solid #000",
    borderLeft: "1px solid #000",
    borderRight: "1px solid #000"
  }
}));
