import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";

import { Popup } from "../components";
import { Environments } from "../features/environments";
import { EnvironmentCreate } from "../features/environmentCreate";
import { EnvironmentDetails } from "../features/environmentDetails";
import { PageTabs } from "../features/tabs";
import { useAppSelector } from "../hooks";

export const PageLayout = () => {
  const { selectedEnvironment, newEnvironment } = useAppSelector(
    state => state.tabs
  );
  const [isEnvCreated, setIsEnvCreated] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    description: null
  });

  const onCreateEnv = (notification: any) => {
    setNotification(notification);
    setIsEnvCreated(true);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(max-content, 275px) 1fr",
        width: "100%",
        height: "100%",
        background: "#FFF"
      }}
    >
      <Environments
        refreshEnvironments={isEnvCreated}
        onUpdateRefreshEnvironments={setIsEnvCreated}
      />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F9F9F9",
          height: "100%",
          overflowY: "scroll"
        }}
      >
        {(selectedEnvironment || newEnvironment.isActive) && (
          <>
            <PageTabs />

            {selectedEnvironment && !newEnvironment.isActive && (
              <Box>
                <EnvironmentDetails environmentNotification={setNotification} />
              </Box>
            )}

            {!selectedEnvironment && newEnvironment.isActive && (
              <Box>
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
              height: "100%"
            }}
          >
            <Typography sx={{ fontSize: "18px", color: "#333" }}>
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
