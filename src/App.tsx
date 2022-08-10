import * as React from "react";
import Typography from "@mui/material/Typography";
import "../style/index.css";
import { EnvMetadata } from "./features/metadata";
import { ArtifactList } from "src/features/artifacts";

export const App = () => {
  const artifactList = [
    {
      name: "Link to lockfile",
      route: "/api/v1/build/{build_id}/lockfile/"
    },
    {
      name: "Link to yml file",
      route: "/api/v1/build/{build_id}/yaml/"
    },
    {
      name: "Link to archive",
      route: "/api/v1/build/{build_id}/archive/"
    },
    {
      name: "Conda Env {build_id} log",
      route: "/api/v1/build/{build_id}/logs"
    }
  ];

  return (
    <>
      <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
        Hello World
      </Typography>
      <ArtifactList artifacts={artifactList} />
      <EnvMetadata />
    </>
  );
};
