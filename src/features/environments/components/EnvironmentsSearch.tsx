import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";

import { PrefContext } from "../../../preferences";
import { SearchIconAlt } from "../../../components";
import { AuthButton } from "../../auth";

interface IEnvironmentsSearchProps {
  /**
   * @param onChange change handler that will trigger when we search for an environment
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EnvironmentsSearch = ({ onChange }: IEnvironmentsSearchProps) => {
  const prefs = React.useContext(PrefContext);
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
      <Typography
        data-testid="env-search-title"
        sx={{
          marginBottom: "14px",
          textAlign: "left",
          color: " #333",
          fontWeight: 600,
          fontSize: "14px",
          marginTop: "40px"
        }}
      >
        Package Manager
      </Typography>
      {authButton}
      <OutlinedInput
        onChange={onChange}
        size="small"
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
