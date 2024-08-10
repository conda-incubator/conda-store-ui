import React from "react";
import Typography from "@mui/material/Typography";

export const LockfileSupportInfo = () => (
  <Typography sx={{ fontSize: "12px" }}>
    We currently only support the{" "}
    <a
      href="https://conda.github.io/conda-lock/"
      target="_blank"
      rel="noreferrer"
    >
      Conda lockfile
    </a>{" "}
    format. Other lockfile formats such as Poetry are not supported.
  </Typography>
);

export default LockfileSupportInfo;
