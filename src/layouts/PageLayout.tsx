import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Popup } from "src/components";
import { Environments } from "src/features/environments";
import { Typography } from "@mui/material";
import { PageTabs } from "src/features/tabs";
import { useAppSelector } from "src/hooks";
import { EnvironmentDetails } from "src/features/environmentDetails";
import { EnvironmentCreate } from "src/features/environmentCreate";

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
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <Environments
        refreshEnvironments={isEnvCreated}
        onUpdateRefreshEnvironments={setIsEnvCreated}
      />
      <Box sx={{ borderTop: "1px solid #A7A7A7", width: "100%" }}>
        {(selectedEnvironment || newEnvironment.isActive) && (
          <>
            <PageTabs />

            {selectedEnvironment && !newEnvironment.isActive && (
              <Box
                sx={{
                  border: "1px solid #000",
                  width: "100%",
                  marginTop: "-1px"
                }}
              >
                <EnvironmentDetails environmentNotification={setNotification} />
              </Box>
            )}

            {!selectedEnvironment && newEnvironment.isActive && (
              <Box
                sx={{
                  border: "1px solid #000",
                  width: "100%",
                  marginTop: "-1px"
                }}
              >
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
            <Typography
              sx={{ fontSize: "20px", color: "#000", marginBottom: "100px" }}
            >
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
