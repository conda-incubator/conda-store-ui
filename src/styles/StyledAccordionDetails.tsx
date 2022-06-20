import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/system";

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  border: "1px solid #C4C4C4",
  borderTop: "none",
  borderRadius: "0px 0px 5px 5px",
  padding: "11px 40px",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "15px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#C4C4C4",
    borderRadius: "10px",
    border: "1px solid #666666",
  },
}));

export default StyledAccordionDetails;
