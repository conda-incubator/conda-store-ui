import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const StyledScrollContainer = styled(Box, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme: { palette } }) => ({
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  paddingRight: "0px",
  "&::-webkit-scrollbar": {
    width: "10px"
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: palette.secondary.light,
    borderRadius: "5px",
    border: "none"
  }
}));
