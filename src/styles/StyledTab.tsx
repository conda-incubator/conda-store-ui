import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledTab = styled(Tab, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(
  ({ theme: { palette }, styleType = currentStyleType }) => ({
    border: "transparent",
    padding: "7px 12px",
    textTransform: "none",
    fontSize: "20px",
    minHeight: "48px",
    maxHeight: "48px",
    maxWidth: "340px",
    justifyContent: "space-between",
    "&.Mui-selected": {
      color: "#3C4043",
      fontWeight: 400,
      border: "1px solid #E0E0E0",
      borderTop: "none",
      borderBottom: "none",
      background: "#F9F9F9"
    }
  })
);
