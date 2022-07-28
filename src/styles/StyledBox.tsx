import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)(({ theme: { palette } }) => ({
  border: "1px solid #000000",
  overflowY: "scroll"
}));
