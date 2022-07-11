import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/system";

export const StyledAccordionDetails = styled(AccordionDetails)(
  ({ theme: { palette } }) => ({
    border: `1px solid ${palette.primary.main}`,
    borderTop: "none",
    borderRadius: "0px 0px 5px 5px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "15px"
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `${palette.primary.main}`,
      borderRadius: "10px",
      border: "1px solid #666666"
    }
  })
);
