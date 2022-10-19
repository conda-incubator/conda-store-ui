import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { LoginIcon, SearchIconAlt } from "../../../components";
import {
  getIconForStyleType,
  getStylesForStyleType
} from "../../../utils/helpers";
import {
  environmentSearchTitleGrayscaleStyles,
  environmentSearchTitleGreenAccentStyles,
  searchBoxGrayscaleStyles,
  searchBoxGreenAccentStyles,
  searchInputGrayscaleStyles,
  searchInputGreenAccentStyles
} from "../styles";

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

  const titleStyles = getStylesForStyleType(
    environmentSearchTitleGrayscaleStyles,
    environmentSearchTitleGreenAccentStyles
  );

  const searchBoxStyles = getStylesForStyleType(
    searchBoxGrayscaleStyles,
    searchBoxGreenAccentStyles
  );

  const searchInputStyles = getStylesForStyleType(
    searchInputGrayscaleStyles,
    searchInputGreenAccentStyles
  ) as React.CSSProperties;

  const loginIcon = getIconForStyleType(
    <PersonIcon sx={{ color: "black" }} />,
    <LoginIcon />
  );

  const inputIcon = getIconForStyleType(
    <SearchIcon sx={{ color: "#A7A7A7" }} />,
    <SearchIconAlt style={{ marginRight: "5px" }} />
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
      <Typography data-testid="env-search-title" sx={titleStyles}>
        Package Manager
      </Typography>
      {login}
      <OutlinedInput
        onChange={onChange}
        size="small"
        endAdornment={
          <InputAdornment position="end">{inputIcon}</InputAdornment>
        }
        placeholder="Search for environment"
        sx={searchBoxStyles}
        inputProps={{
          style: searchInputStyles
        }}
      />
    </Box>
  );
};
