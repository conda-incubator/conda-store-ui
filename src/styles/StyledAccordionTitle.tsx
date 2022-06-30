import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const StyledAccordionTitle = styled(Typography)(({ theme: { palette } }) => ({
  fontSize: "18px",
  fontWeight: 500
}));

export default StyledAccordionTitle;
