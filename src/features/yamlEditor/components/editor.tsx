import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { yaml as yamlLanguage } from "@codemirror/legacy-modes/mode/yaml";
import { parse, stringify } from "yaml";

export interface ICodeEditor {
  code: any;
}

export const CodeEditor = ({ code }: ICodeEditor) => {
  const test = (e: string) => {
    console.log(parse(e));
  };
  return (
    <CodeMirror
      value={code}
      height="200px"
      extensions={[StreamLanguage.define(yamlLanguage)]}
      onChange={e => test(e)}
    />
  );
};
