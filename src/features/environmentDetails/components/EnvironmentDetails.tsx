import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "src/hooks";
import { EnvironmentDetailsHeader } from "./EnvironmentDetailsHeader";
import { Specification } from "./Specification";
import { useGetBuildQuery } from "../environmentDetailsApiSlice";
import { useGetBuildPackagesQuery } from "src/features/dependencies";

export const EnvironmentDetails = () => {
  const { mode } = useAppSelector(state => state.environmentDetails);
  const { page } = useAppSelector(state => state.dependencies);

  useGetBuildQuery(1);
  useGetBuildPackagesQuery({ buildId: 1, page, size: 100 });

  return (
    <Box sx={{ border: "1px solid #000", padding: "18px 12px" }}>
      <EnvironmentDetailsHeader />
      <Box sx={{ marginBottom: "30px" }}>
        <Typography>Environment Metadata</Typography>
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <Specification />
      </Box>
      {mode === "read-only" && (
        <Box>
          <Typography>Logs and artifacts</Typography>
        </Box>
      )}
    </Box>
  );
};
