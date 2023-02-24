import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Popup } from "../components";
import { Environments } from "../features/environments";
import { EnvironmentCreate } from "../features/environmentCreate";
import { EnvironmentDetails } from "../features/environmentDetails";
import { PageTabs } from "../features/tabs";
import { StyledScrollContainer } from "../styles";
import { useAppSelector } from "../hooks";

interface IUpdateEnvironment {
  data: {
    show: boolean;
    description: string;
  };
}

export const PageLayout = () => {
  const { selectedEnvironment, newEnvironment } = useAppSelector(
    state => state.tabs
  );
  const [refreshEnvironments, setRefreshEnvironments] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    description: ""
  });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const onUpdateOrCreateEnv = ({ data }: IUpdateEnvironment) => {
    setRefreshEnvironments(true);
    setNotification(data);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(max-content, 275px) 1fr",
        gridTemplateRows: "100%",
        width: "100%",
        height: "100%",
        background: "#FFF"
      }}
    >
      <Environments
        refreshEnvironments={refreshEnvironments}
        onUpdateRefreshEnvironments={setRefreshEnvironments}
      />
      <StyledScrollContainer
        ref={scrollRef}
        sx={{
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
                <EnvironmentDetails
                  environmentNotification={onUpdateOrCreateEnv}
                  scrollRef={scrollRef}
                />
              </Box>
            )}

            {!selectedEnvironment && newEnvironment.isActive && (
              <Box>
                <EnvironmentCreate
                  environmentNotification={onUpdateOrCreateEnv}
                />
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
      </StyledScrollContainer>
      <Popup
        isVisible={notification.show}
        description={notification.description}
        onClose={setNotification}
      />
    </Box>
  );
};
