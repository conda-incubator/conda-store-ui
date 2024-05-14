import React, { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { StreamLanguage } from "@codemirror/language";
import { yaml as yamlLanguage } from "@codemirror/legacy-modes/mode/yaml";
import Alert from "@mui/material/Alert";
import CodeMirror from "@uiw/react-codemirror";
import { greenAccentTheme } from "../themes";
import { PrefContext } from "../../../preferences";
import parseCodeEditorContent from "../../../utils/helpers/parseCodeEditorContent";
import Typography from "@mui/material/Typography";

export interface ICodeEditor {
  code: string;
  onChangeEditor: (code: string) => void;
}

const checkForError = debounce((code, setErrorMessage) => {
  try {
    parseCodeEditorContent(code);
    setErrorMessage("");
  } catch (err) {
    setErrorMessage(err.toString());
  }
}, 400);

const formatCode = (code: string) =>
  code === ""
    ? "channels:\n  -\ndependencies:\n  -\nvariables: {}\n"
    : code
        .replace("channels: []", "channels:\n  -")
        .replace("dependencies: []", "dependencies:\n  -");

export const CodeEditor = ({ code, onChangeEditor }: ICodeEditor) => {
  const prefs = React.useContext(PrefContext);
  const isGrayscaleStyleType = prefs.styleType === "grayscale";
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = useCallback((code: string) => {
    onChangeEditor(code);
    checkForError(code, setErrorMessage);
  }, []);

  return (
    <>
      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            mb: "20px"
          }}
        >
          You have an error.
          <Typography>{errorMessage}</Typography>
        </Alert>
      )}
      <CodeMirror
        value={formatCode(code)}
        height="200px"
        theme={isGrayscaleStyleType ? undefined : greenAccentTheme}
        extensions={[StreamLanguage.define(yamlLanguage)]}
        onChange={onChange}
      />
    </>
  );
};
