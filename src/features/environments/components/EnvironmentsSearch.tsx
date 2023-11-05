import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

import { PrefContext } from "../../../preferences";
import { SearchIconAlt, CondaLogo } from "../../../components";
import { AuthButton } from "../../auth";

interface IEnvironmentsSearchProps {
  /**
   * @param onChange change handler that will trigger when we search for an environment
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EnvironmentsSearch = ({ onChange }: IEnvironmentsSearchProps) => {
  const prefs = React.useContext(PrefContext);
  const { palette } = useTheme();
  const showAuthButton = prefs.showAuthButton;
  const isCookieAuthMethod = prefs.authMethod === "cookie";
  let authButton;

  if (showAuthButton && isCookieAuthMethod) {
    authButton = <AuthButton></AuthButton>;
  }

  return (
    <Box
      sx={{
        padding: "15px 12px",
        position: "relative"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 14,
          height: 35,
          width: "auto"
        }}
      >
        <CondaLogo transform="0.5"></CondaLogo>
      </Box>
      {authButton}
      <Typography
        data-testid="env-search-title"
        sx={{
          marginBottom: "14px",
          textAlign: "left",
          color: palette.common.black,
          fontWeight: 600,
          fontSize: "14px",
          marginTop: "55px"
        }}
      >
        Package Manager
      </Typography>
      <OutlinedInput
        onChange={onChange}
        size="small"
        notched={false}
        endAdornment={
          <InputAdornment position="end">
            <SearchIconAlt style={{ marginRight: "5px" }} />
          </InputAdornment>
        }
        placeholder="Search for environment"
        sx={{
          borderRadius: "15px",
          paddingRight: "10px",
          width: "100%",
          "&::placeholder": {
            fontSize: "14px",
            fontWeight: 400
          }
        }}
        inputProps={{
          style: {
            padding: "7px",
            paddingLeft: "15px",
            fontSize: "14px"
          }
        }}
      />
    </Box>
  );
};
