export * from "./App";
export { IPreferences } from "./preferences";
export { store } from "./store";
export { theme, themeDecorator } from "./theme";

import React from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";

export function createApp(elem: HTMLElement) {
  // const root = ReactDOM.createRoot(document.getElementById('root'));
  const root = createRoot(elem);
  root.render(React.createElement(App, null, null));

  return root;
}
