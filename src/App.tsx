import * as React from "react";
import Typography from "@mui/material/Typography";
import "../style/index.css";
import { EnvironmentDetails } from "src/features/environmentDetails";
import { useGetBuildQuery, useGetVersionQuery } from "./features/api";

export const App = () => {
  // tried creating a basic request using fetch API, still the same error

  const { data } = useGetBuildQuery();
  const { data: versionResponse } = useGetVersionQuery();

  console.log(data);
  console.log(versionResponse);

  return (
    <>
      <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
        Hello World
      </Typography>
      <EnvironmentDetails />
    </>
  );
};
