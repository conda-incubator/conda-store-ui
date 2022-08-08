import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)(() => ({
  border: "1px solid #000000",
  width: 1000,
  marginTop: "25px",
  boxShadow: "none",
  overflowY: "scroll"
}));
