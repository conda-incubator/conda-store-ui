import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/system";

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  paddingLeft: "21px",
  paddingRight: "10px",
  height: 50,
  border: "1px solid #C4C4C4",
  "&.Mui-expanded": {
    minHeight: 50,
    maxHeight: 50,
    ".MuiAccordionSummary-expandIconWrapper": {
      transform: "rotate(90deg)",
    },
  },
}));

export default StyledAccordionSummary;
