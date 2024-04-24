import React, { useState, useEffect } from "react";

import { StyledButton } from "../../../styles";
import { PrefContext } from "../../../preferences";
import {
  useLazyGetAuthQuery,
  useLogoutMutation,
  useLoginMutation
} from "../authApiSlice";

export const AuthButton = () => {
  const prefs = React.useContext(PrefContext);
  const authUrl = prefs.loginUrl;
  const pageUrl = window.location.href;
  const loginPageUrl = `${authUrl}${pageUrl}`;
  const logoutUrl = prefs.logoutUrl;

  const [triggerAuthQuery] = useLazyGetAuthQuery();
  const [triggerLogout] = useLogoutMutation();
  const [triggerLogin] = useLoginMutation();

  const [authenticated, setAuthenticated] = useState(false);

  const performLogout = async () => {
    await triggerLogout(logoutUrl);
    setAuthenticated(false);
    window.location.href = pageUrl;
  };

  const performLogin = async () => {
    await triggerLogin(loginPageUrl);
    setAuthenticated(true);
    window.location.href = loginPageUrl;
  };

  const handleOnClick = () => {
    if (authenticated) {
      performLogout();
    } else {
      performLogin();
    }
  };

  const getPermissions = async () => {
    const { data: permissions } = await triggerAuthQuery();
    setAuthenticated(permissions.data.authenticated);
  };

  useEffect(() => {
    (async () => {
      getPermissions();
    })();
  }, []);

  return (
    <StyledButton
      color="primary"
      onClick={() => {
        handleOnClick();
      }}
      sx={{ position: "absolute", top: 14, right: 18 }}
    >
      {authenticated ? "Log out" : "Log in"}
    </StyledButton>
  );
};
