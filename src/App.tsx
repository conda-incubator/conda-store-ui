import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";

import { PageLayout } from "./layouts";
import { IPreferences, PrefContext, prefDefault, prefGlobal } from "./preferences";
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

export interface IAppProps {
  pref?: Partial<IPreferences>;
}

export interface IAppState {
  pref: IPreferences;
}

export class App<T extends IAppProps = IAppProps, U extends IAppState = IAppState> extends React.Component<T, U> {
  /**
   * Returns a React component for rendering a panel for performing Git operations.
   *
   * @param props - component properties
   * @returns React component
   */
  constructor(props: T) {
    super(props);

    const pref = {...prefDefault, ...(props.pref ?? {})};
    prefGlobal.set(pref);
    this.state = {pref} as U;
  }

  setPref(pref: U["pref"]) {
    pref = {...this.state.pref, ...pref};

    prefGlobal.set(pref);
    this.setState({pref});
    // this.forceUpdate();
  }

  /**
   * define `componentDidMount` in a child class in order to subscribe to pref updates
   */
  // componentDidMount(): void {
  // }

  /**
   * if `componentDidMount` is used to subscribe to pref updates in a child class, also
   * define `componentWillUnmount` in order to unsubscribe to pref updates and thereby
   * properly clean up this component on its destruction
   */
  // componentWillUnmount(): void {
  // }

  render(): React.ReactNode {
    return (
      <PrefContext.Provider value={this.state.pref}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <AppRouter />
          </Provider>
        </ThemeProvider>
      </PrefContext.Provider>
    );
  }
}
