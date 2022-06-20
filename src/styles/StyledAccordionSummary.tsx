import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/system";

const StyledAccordionSummary = styled(AccordionSummary)(
  ({ theme: { palette } }) => ({
    paddingLeft: "21px",
    paddingRight: "10px",
    height: 50,
    border: `1px solid ${palette.primary.main}`,
    "&.Mui-expanded": {
      minHeight: 50,
      maxHeight: 50,
      ".MuiAccordionSummary-expandIconWrapper": {
        transform: "rotate(90deg)",
      },
    },
  })
);

export default StyledAccordionSummary;
