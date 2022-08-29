import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { yaml as yamlLanguage } from "@codemirror/legacy-modes/mode/yaml";
import { parse } from "yaml";

export interface ICodeEditor {
  code: any;
  onChangeEditor: (str: any) => void;
}

export const CodeEditor = ({ code, onChangeEditor }: ICodeEditor) => {
  const convertToJSON = (e: string) => {
    try {
      // return parse(e);
      onChangeEditor(parse(e));
    } catch (e) {
      onChangeEditor("");
    }
  };
  return (
    <CodeMirror
      value={code}
      height="200px"
      extensions={[StreamLanguage.define(yamlLanguage)]}
      onChange={e => convertToJSON(e)}
    />
  );
};
