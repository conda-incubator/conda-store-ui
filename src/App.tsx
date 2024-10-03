import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import {
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter
} from "react-router-dom";
import {
  IPreferences,
  PrefContext,
  prefDefault,
  prefGlobal
} from "./preferences";
import { routes } from "./routes";

import { store } from "./store";
import { condaStoreTheme, grayscaleTheme } from "./theme";

import "../style/index.css";

export interface IAppProps {
  pref?: Partial<IPreferences>;
}

export interface IAppState {
  pref: IPreferences;
}

export class App<
  T extends IAppProps = IAppProps,
  U extends IAppState = IAppState
> extends React.Component<T, U> {
  /**
   * Returns a React component for rendering a panel for performing Git operations.
   *
   * @param props - component properties
   * @returns React component
   */
  constructor(props: T) {
    super(props);

    const pref = { ...prefDefault, ...(props.pref ?? {}) };
    prefGlobal.set(pref);
    this.state = { pref } as U;
  }

  setPref(pref: U["pref"]) {
    pref = { ...this.state.pref, ...pref };

    prefGlobal.set(pref);
    this.setState({ pref });
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
    const router =
      this.state.pref.routerType === "memory"
        ? createMemoryRouter(routes, { initialEntries: ["/"] })
        : createBrowserRouter(routes);

    return (
      <PrefContext.Provider value={this.state.pref}>
        <ThemeProvider
          theme={
            this.state.pref.styleType === "grayscale"
              ? grayscaleTheme
              : condaStoreTheme
          }
        >
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </ThemeProvider>
      </PrefContext.Provider>
    );
  }
}
