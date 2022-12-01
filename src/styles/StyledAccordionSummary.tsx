import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/system";
import { config } from "../common/constants";

const currentStyleType = config.styleType;

export const StyledAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(
  ({ theme: { palette }, styleType = currentStyleType }) => ({
    paddingLeft: "15px",
    paddingRight: "14px",
    height: 40,
    border:
      styleType === "grayscale"
        ? `1px solid ${palette.primary.main}`
        : "1px solid #BCBFC4",
    borderRadius: styleType === "grayscale" ? "5px" : "0px",
    "&.Mui-expanded": {
      minHeight: 40,
      maxHeight: 40,
      margin: "0px",
      borderRadius: "0",
      ".MuiAccordionSummary-expandIconWrapper": {
        transform: "rotate(90deg)"
      }
    }
  })
);
