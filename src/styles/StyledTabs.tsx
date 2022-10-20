import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(
  ({ theme: { palette }, styleType = currentStyleType }) => ({
    backgroundColor: styleType === "grayscale" ? "#fff" : "#F9F9F9",
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#fff"
    }
  })
);
