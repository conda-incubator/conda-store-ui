import createTheme from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export const greenAccentTheme = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#0A3069",
    caret: "#cf080c",
    selection: "#F1F1F1",
    selectionMatch: "#F1F1F1",
    lineHighlight: "#8a91991a",
    gutterBackground: "#fff",
    gutterForeground: "#57606A",
    gutterBorder: "transparent"
  },
  styles: [{ tag: t.keyword, color: "#116329" }]
});
