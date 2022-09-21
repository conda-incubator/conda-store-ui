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
  const authMethod =
    process.env.REACT_APP_AUTH_METHOD === "cookie" ? true : false;
  const authUrl = process.env.REACT_APP_LOGIN_PAGE;
  const pageUrl = window.location.href;
  const loginPageUrl = `${authUrl}${pageUrl}`;
  let login;

  if (authMethod) {
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
        sx={{ marginBottom: "16px", textAlign: "center" }}
      >
        Package Manager
      </Typography>
      {login}
      <OutlinedInput
        onChange={onChange}
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon sx={{ color: "#A7A7A7" }} />
          </InputAdornment>
        }
        placeholder="Search for environment"
        sx={{ borderRadius: "0px", paddingRight: "5px", width: "288px" }}
        inputProps={{
          style: { padding: "5px", paddingLeft: "15px", fontSize: "14px" }
        }}
      />
    </Box>
  );
};
