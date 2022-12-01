import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import React from "react";

import { PrefContext } from "../../../preferences";
import { LoginIcon, SearchIconAlt } from "../../../components";
import { getIconForStyleType } from "../../../utils/helpers";

interface IEnvironmentsSearchProps {
  /**
   * @param onChange change handler that will trigger when we search for an environment
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EnvironmentsSearch = ({ onChange }: IEnvironmentsSearchProps) => {
  const prefs = React.useContext(PrefContext);

  const isCookieAuthMethod = prefs.authMethod === "cookie";
  const authUrl = prefs.loginUrl;
  const pageUrl = window.location.href;
  const loginPageUrl = `${authUrl}${pageUrl}`;
  let login;

  const loginIcon = getIconForStyleType(
    <LoginIcon color=" #9AA0A6" />,
    <LoginIcon color="#B9D9BD" />
  );

  if (isCookieAuthMethod) {
    login = (
      <Link
        href={loginPageUrl}
        sx={{ position: "absolute", top: 14, right: 18 }}
      >
        {loginIcon}
      </Link>
    );
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
          textAlign: "center",
          color: " #3C4043",
          fontWeight: 700,
          fontSize: "14px",
          marginTop: "30px"
        }}
      >
        Package Manager
      </Typography>
      {login}
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
