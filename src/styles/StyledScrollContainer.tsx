import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const StyledScrollContainer = styled(Box)(({ theme: { palette } }) => ({
  overflowY: "scroll",
  overflowX: "hidden",
  paddingRight: "0px",
  "&::-webkit-scrollbar": {
    width: "15px"
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `${palette.primary.main}`,
    borderRadius: "10px",
    border: "1px solid #666666"
  }
}));
