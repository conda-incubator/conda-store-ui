import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/system";

export const StyledAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(
  ({ theme: { palette }, styleType = "green-accent" }) => ({
    paddingLeft: "21px",
    paddingRight: styleType === "grayscale" ? "10px" : "16px",
    height: 50,
    border:
      styleType === "grayscale"
        ? `1px solid ${palette.primary.main}`
        : "1px solid #BCBFC4",
    borderRadius: styleType === "grayscale" ? "5px" : "0px",
    "&.Mui-expanded": {
      minHeight: 50,
      maxHeight: 50,
      margin: "0px",
      borderRadius: styleType === "grayscale" ? "5px 5px 0px 0px" : "0px",
      ".MuiAccordionSummary-expandIconWrapper": {
        transform: "rotate(90deg)"
      }
    }
  })
);
