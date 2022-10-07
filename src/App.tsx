import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import "../style/index.css";
import { PageLayout } from "./layouts";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />} />
        <Route path="/lab" element={<PageLayout />} />
      </Routes>
    </Router>
  );
};
