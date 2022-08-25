import React from "react";
import Box from "@mui/material/Box";
import { Environments } from "src/features/environments";
import { Typography } from "@mui/material";
import { PageTabs } from "src/features/tabs";
import { useAppSelector } from "src/hooks";
import { EnvironmentDetails } from "src/features/environmentDetails";

export const PageLayout = () => {
  const { selectedEnvironment, newEnvironment } = useAppSelector(
    state => state.tabs
  );

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <Environments />
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
                <EnvironmentDetails />
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
                Create new env!
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
    </Box>
  );
};
