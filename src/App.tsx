import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";

import { PageLayout } from "./layouts";
import { IPreferences, PrefContext, prefGlobal } from "./preferences";
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

interface AppProps {
  prefs?: IPreferences,
  initState?: (setPrefs: (prefs: IPreferences) => void) => void
}

export const App = ({prefs = {}, initState}: AppProps) => {
  prefs = {...prefGlobal, ...prefs};
  const [prefState, _] = React.useState(prefs);
  // const [prefState, setPrefState] = React.useState(prefs);
  
  const setPrefs = (prefNew: IPreferences) => {
    prefGlobal.apiUrl = prefNew.apiUrl ?? prefGlobal.apiUrl;
    prefGlobal.authMethod = prefNew.authMethod ?? prefGlobal.authMethod;
    prefGlobal.authToken = prefNew.authToken ?? prefGlobal.authToken;
    prefGlobal.loginUrl = prefNew.loginUrl ?? prefGlobal.loginUrl;

    // setPrefState(prefPrev => {
    //   return {...prefPrev, ...prefNew};
    // });
  }

  if (initState !== undefined) {
    initState(setPrefs);
  }

  return (
    <PrefContext.Provider value={prefState}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ThemeProvider>
    </PrefContext.Provider>
  );
};
