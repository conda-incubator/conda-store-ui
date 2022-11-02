import React, { useState } from "react";
import { StreamLanguage } from "@codemirror/language";
import { yaml as yamlLanguage } from "@codemirror/legacy-modes/mode/yaml";
import Alert from "@mui/material/Alert";
import CodeMirror from "@uiw/react-codemirror";
import { parse } from "yaml";
import { greenAccentTheme } from "../themes";
import { config } from "../../../common/constants";

export interface ICodeEditor {
  code: any;
  onChangeEditor: (code: {
    channels: string[];
    dependencies: string[];
  }) => void;
}

export const CodeEditor = ({ code, onChangeEditor }: ICodeEditor) => {
  const [isError, setIsError] = useState(false);
  const isGrayscaleStyleType = config.styleType === "grayscale";

  const convertToJSON = (e: string) => {
    try {
      setIsError(false);
      onChangeEditor(parse(e));
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      {isError && (
        <Alert
          severity="error"
          sx={{
            mb: "20px"
          }}
        >
          You have an error in your yaml syntax
        </Alert>
      )}
      <CodeMirror
        value={code}
        height="200px"
        theme={isGrayscaleStyleType ? undefined : greenAccentTheme}
        extensions={[StreamLanguage.define(yamlLanguage)]}
        onChange={e => convertToJSON(e)}
      />
    </>
  );
};
