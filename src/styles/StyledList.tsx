import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const StyledBox = styled(Box)(({ theme: { palette } }) => ({
  border: `1px solid ${palette.primary.main}`,
  borderTop: "none",
  borderRadius: "0px 0px 5px 5px",
  overflowY: "scroll"
}));
