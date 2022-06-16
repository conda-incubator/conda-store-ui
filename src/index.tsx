export * from "./hooks";
export * from "./store";

export * from "./components";

import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.querySelector("body");
const root = createRoot(container!);
root.render(<App />);
