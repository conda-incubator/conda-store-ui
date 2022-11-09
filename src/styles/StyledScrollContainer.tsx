import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledScrollContainer = styled(Box, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(
  ({ theme: { palette }, styleType = currentStyleType }) => ({
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
      backgroundColor: "#DADCE0",
      borderRadius: "5px",
      border: "none"
    }
  })
);
