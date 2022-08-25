import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";

export interface ICodeEditor {
  code: any;
}

export const CodeEditor = ({ code }: ICodeEditor) => {
  return (
    <CodeMirror
      value={code}
      height="200px"
      extensions={[StreamLanguage.define(yaml)]}
    />
  );
};
