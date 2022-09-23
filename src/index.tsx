export * from "./App";
export { store } from "./store";
export { theme, themeDecorator } from "./theme";

import * as React from "react";
import { AppExample } from "./App";
import { createRoot } from "react-dom/client";

const container = document.createElement("div");
const body = document.querySelector("body");

container.setAttribute("id", "app");
body?.appendChild(container);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <AppExample/>
);
