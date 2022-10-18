import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";

import { PageLayout } from "./layouts";
import { IPreferences, PreferencesContext, prefDefault } from "./preferences";
import { store } from "./store";
import { theme } from "./theme";

import "../style/index.css";

const AppRouter = () => {
  // for now, trivial routing is sufficient
  return (
    <Router>
      <Routes>
        <Route path="*" element={<PageLayout />} />
      </Routes>
    </Router>
  );
};

export const App = (pref: IPreferences = {}) => {
  pref = {...prefDefault, ...pref};
  const [prefState, setPrefState] = React.useState(pref);

  function setPref(pref: IPreferences = {}) {
    pref = {...prefState, ...pref};
    setPrefState(pref);
  }

  return (
    <PreferencesContext.Provider value={prefState}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </PreferencesContext.Provider>
  );
};
