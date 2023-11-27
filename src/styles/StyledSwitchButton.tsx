import Switch from "@mui/material/Switch";
// import { switchClasses } from "@material-ui/core/Switch";
import { styled } from "@mui/system";

export const StyledSwitch = styled(Switch, {
  shouldForwardProp: prop => prop !== "styleType"
})<{ styleType?: string }>(({ theme: { palette } }) => ({
  width: 62,
  "& .MuiSwitch-switchBase": {
    padding: "1px",
    margin: "6px",
    backgroundColor: palette.primary.main,
    "&.Mui-checked": {
      backgroundColor: palette.primary.main,
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: palette.secondary.light
      },
      ":hover": {
        boxShadow: `0px 0px 10px ${palette.primary.light}`,
        backgroundColor: palette.primary.main
      },
      ":focus": {
        boxShadow: `0px 0px 10px ${palette.primary.light}`,
        backgroundColor: palette.primary.main
      }
    },
    ":hover": {
      boxShadow: `0px 0px 10px ${palette.primary.light}`,
      backgroundColor: palette.primary.main
    },
    ":focus": {
      boxShadow: `0px 0px 10px ${palette.primary.light}`,
      backgroundColor: palette.primary.main
    }
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: palette.primary.main
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: palette.secondary.light
  }
}));
