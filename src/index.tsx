export * from "./store";

import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

const container = document.createElement("div");
const body = document.querySelector("body");

container.setAttribute("id", "app");
body?.appendChild(container);

const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
