import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";

import { Popup } from "../components";
import { Environments } from "../features/environments";
import { EnvironmentCreate } from "../features/environmentCreate";
import { EnvironmentDetails } from "../features/environmentDetails";
import { PageTabs } from "../features/tabs";
import { useAppSelector } from "../hooks";
import { getStylesForStyleType } from "../utils/helpers";

export const PageLayout = () => {
  const { selectedEnvironment, newEnvironment } = useAppSelector(
    state => state.tabs
  );
  const [isEnvCreated, setIsEnvCreated] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    description: null
  });

  const containerStyles = getStylesForStyleType(
    { display: "flex", width: "100%", height: "100%" },
    { display: "flex", width: "100%", height: "100%" }
  );

  const contentSectionStyles = getStylesForStyleType({
    border: "1px solid #E0E0E0",
    width: "100%",
    marginTop: "-1px",
    backgroundColor: "#F9F9F9"
  });

  const onCreateEnv = (notification: any) => {
    setNotification(notification);
    setIsEnvCreated(true);
  };

  return (
    <Box sx={containerStyles}>
      <Environments
        refreshEnvironments={isEnvCreated}
        onUpdateRefreshEnvironments={setIsEnvCreated}
      />
      <Box sx={{ width: "100%" }}>
        {(selectedEnvironment || newEnvironment.isActive) && (
          <>
            <PageTabs />

            {selectedEnvironment && !newEnvironment.isActive && (
              <Box sx={contentSectionStyles}>
                <EnvironmentDetails environmentNotification={setNotification} />
              </Box>
            )}

            {!selectedEnvironment && newEnvironment.isActive && (
              <Box sx={contentSectionStyles}>
                <EnvironmentCreate environmentNotification={onCreateEnv} />
              </Box>
            )}
          </>
        )}
        {!selectedEnvironment && !newEnvironment.isActive && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderLeft: "1px solid #E0E0E0"
            }}
          >
            <Typography sx={{ fontSize: "18px", color: "#3C4043" }}>
              Select an environment to show details
            </Typography>
          </Box>
        )}
      </Box>
      <Popup
        isVisible={notification.show}
        description={notification.description}
        onClose={setNotification}
      />
    </Box>
  );
};
