import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./store/store";
import { theme } from "./theme";

const container = document.createElement("div");
const body = document.querySelector("body");

container.setAttribute("id", "app");
body?.appendChild(container);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
