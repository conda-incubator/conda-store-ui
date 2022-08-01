import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/system";

export const StyledTabs = styled(Tabs)(({ theme: { palette } }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
}));
