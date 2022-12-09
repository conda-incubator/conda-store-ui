import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/system";

export const StyledTabs = styled(Tabs, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme: { palette } }) => ({
  backgroundColor: "#FFF",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#FFF"
  }
}));
