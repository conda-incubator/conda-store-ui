import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import "../style/index.css";
import { PageLayout } from "./layouts";

import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import { theme } from "./theme";

// TODO: fix for jlab
export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />} />
      </Routes>
    </Router>
  );
};

export const AppExample = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export const FooExample = () => {
  return (
    <span>foo text lorem ipsum</span>
  );
};
