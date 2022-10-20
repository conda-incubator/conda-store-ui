import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";

import { PageLayout } from "./layouts";
import { IPreferences, PreferencesContext, prefDefault, PrefDispatch } from "./preferences";
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

export const App = (pref: IPreferences = {}, initState?: (value: PrefDispatch) => void) => {
  pref = {...prefDefault, ...pref};
  const [prefState, setPrefState] = React.useState(pref);
  
  if (initState !== undefined) {
    initState(setPrefState);
  }

  return (
    <PreferencesContext.Provider value={prefState}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ThemeProvider>
    </PreferencesContext.Provider>
  );
};
