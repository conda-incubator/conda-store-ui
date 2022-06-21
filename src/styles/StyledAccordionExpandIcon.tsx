import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { styled } from "@mui/system";

const StyledAccordionExpandIcon = styled(ArrowRightRoundedIcon)(
  ({ theme: { palette } }) => ({
    width: 51,
    height: 55,
    color: palette.primary.main,
  })
);

export default StyledAccordionExpandIcon;
