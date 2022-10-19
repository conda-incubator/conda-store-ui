import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledButtonPrimary = styled(Button, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(
  ({ theme: { palette }, styleType = currentStyleType }) => ({
    padding: styleType === "grayscale" ? "0px 12px" : "3px 30px",
    border: styleType === "grayscale" ? "2px solid #000" : "1px solid #33A852",
    fontSize: styleType === "grayscale" ? "16px" : "14px",
    color: styleType === "grayscale" ? "#000" : "#fff",
    textTransform: "none",
    backgroundColor:
      styleType === "grayscale" ? palette.primary.main : "#33A852",
    boxShadow: "none",
    borderRadius: "5px",
    ":hover": {
      boxShadow: "none",
      color: styleType === "grayscale" ? "initial" : "#33A852"
    }
  })
);
