import * as React from "react";
import Typography from "@mui/material/Typography";
import "../style/index.css";
import { EnvMetadata } from "./features/metadata";
import { buildMapper } from "./utils/helpers/buildMapper";
import { ArtifactList } from "src/features/artifacts";
import { LoginPage } from "./features/login";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import { Route, Routes } from "react-router";
import Link from "@mui/material/Link";

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

  const build_response = {
    status: "ok",
    data: [
      {
        id: 2,
        environment_id: 2,
        specification: null,
        packages: null,
        status: "COMPLETED",
        size: 315875085,
        scheduled_on: "2022-07-14T12:38:42.932219",
        started_on: "2022-07-14T12:38:44.116409",
        ended_on: "2022-07-14T12:39:48.185573",
        build_artifacts: null
      },
      {
        id: 3,
        environment_id: 2,
        specification: null,
        packages: null,
        status: "COMPLETED",
        size: 315875075,
        scheduled_on: "2022-07-14T12:40:38.095584",
        started_on: "2022-07-14T12:40:38.330526",
        ended_on: "2022-07-14T12:41:33.092302",
        build_artifacts: null
      }
    ],
    message: null,
    page: 1,
    size: 100,
    count: 2
  };

  const builds = buildMapper(build_response);

  return (
    <>
      <Router>
        <Link component={RouterLink} to="/login" color="primary">
          Sign in
        </Link>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
        Hello World
      </Typography>
      <ArtifactList artifacts={artifactList} />
      <EnvMetadata builds={builds} />
    </>
  );
};
