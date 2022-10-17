import React from "react";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";

interface IEnvironmentsSearchProps {
  /**
   * @param onChange change handler that will trigger when we search for an environment
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EnvironmentsSearch = ({ onChange }: IEnvironmentsSearchProps) => {
  const isCookieAuthMethod = process.env.REACT_APP_AUTH_METHOD === "cookie";
  const authUrl = process.env.REACT_APP_LOGIN_PAGE_URL;
  const pageUrl = window.location.href;
  const loginPageUrl = `${authUrl}${pageUrl}`;
  let login;

  if (isCookieAuthMethod) {
    login = (
      <Link href={loginPageUrl} sx={{ position: "absolute", top: 0, right: 0 }}>
        <PersonIcon sx={{ color: "black" }} />
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
          marginBottom: "16px",
          textAlign: "center",
          color: "#9AA0A6",
          fontWeight: 700,
          fontSize: "15px"
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
            <SearchIcon sx={{ color: "#BCBFC4" }} />
          </InputAdornment>
        }
        placeholder="Search for environment"
        sx={{ borderRadius: "15px", paddingRight: "10px", width: "288px" }}
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
