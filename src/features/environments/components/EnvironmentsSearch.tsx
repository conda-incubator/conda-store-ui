import React from "react";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";
import { config } from "../../../common/constants";
import {
  environmentSearchTitleGrayscaleStyles,
  environmentSearchTitleGreenAccentStyles,
  searchInputGrayscaleStyles,
  searchInputGreenAccentStyles
} from "../styles";
import {
  getIconForStyleType,
  getStylesForStyleType
} from "../../../utils/helpers";
import { LoginIcon } from "../../../components";

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
  const isGrayscaleStyleType = config.styleType === "grayscale";

  const titleStyles = getStylesForStyleType(
    environmentSearchTitleGrayscaleStyles,
    environmentSearchTitleGreenAccentStyles
  );

  const searchBoxStyles = getStylesForStyleType(
    searchInputGrayscaleStyles,
    searchInputGreenAccentStyles
  );

  const loginIcon = getIconForStyleType(
    <PersonIcon sx={{ color: "black" }} />,
    <LoginIcon />
  );

  if (isCookieAuthMethod) {
    login = (
      <Link href={loginPageUrl} sx={{ position: "absolute", top: 3, right: 3 }}>
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
          <InputAdornment position="end">
            <SearchIcon
              sx={{ color: isGrayscaleStyleType ? "#A7A7A7" : "#BCBFC4" }}
            />
          </InputAdornment>
        }
        placeholder="Search for environment"
        sx={searchBoxStyles.searchStyles}
        inputProps={{
          style: searchBoxStyles.inputStyles
        }}
      />
    </Box>
  );
};
