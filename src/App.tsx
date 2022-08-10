import * as React from "react";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Route, Routes } from "react-router";
import "../style/index.css";
import { PageLayout } from "./layouts";
import { LoginPage } from "./features/login";

export const App = () => {
  return (
    <Router>
      <Link component={RouterLink} to="/login" color="primary">
        Sign in
      </Link>
      <Routes>
        <Route path="/" element={<PageLayout />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};
