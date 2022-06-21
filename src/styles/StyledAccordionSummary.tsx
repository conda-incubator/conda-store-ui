import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/system";

const StyledAccordionSummary = styled(AccordionSummary)(
  ({ theme: { palette } }) => ({
    paddingLeft: "21px",
    paddingRight: "10px",
    height: 50,
    border: `1px solid ${palette.primary.main}`,
    borderRadius: "5px",
    "&.Mui-expanded": {
      minHeight: 50,
      maxHeight: 50,
      borderRadius: "5px 5px 0px 0px",
      ".MuiAccordionSummary-expandIconWrapper": {
        transform: "rotate(90deg)",
      },
    },
  })
);

export default StyledAccordionSummary;
