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
      color: "#000",
      fontWeight: 500,
      border:
        styleType === "grayscale" ? "1px solid #000" : "1px solid #E0E0E0",
      borderBottom:
        styleType === "grayscale" ? "1px solid #fff" : "1px solid #F9F9F9"
    }
  })
);
