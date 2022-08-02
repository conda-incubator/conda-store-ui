import * as React from "react";
import Typography from "@mui/material/Typography";
import "../style/index.css";
import { EnvironmentDetails } from "src/features/environmentDetails";

export const App = () => {
  return (
    <>
      <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
        Hello World
      </Typography>
      <EnvironmentDetails />
    </>
  );
};
