import React, { useState } from "react";
import Box from "@mui/material/Box";
import { StreamLanguage } from "@codemirror/language";
import { yaml as yamlLanguage } from "@codemirror/legacy-modes/mode/yaml";
import Alert from "@mui/material/Alert";
import CodeMirror from "@uiw/react-codemirror";
import { parse } from "yaml";
import { greenAccentTheme } from "../themes";
import { PrefContext } from "../../../preferences";
import { StyledMetadataItem } from "../../../styles";
import { Link, Typography } from "@mui/material";

export interface ICodeEditor {
  code: any;
  onChangeEditor: (code: {
    channels: string[];
    dependencies: string[];
    variables: Record<string, string>;
  }) => void;
}

export const CodeEditor = ({ code, onChangeEditor }: ICodeEditor) => {
  const prefs = React.useContext(PrefContext);
  const isGrayscaleStyleType = prefs.styleType === "grayscale";
  const [isError, setIsError] = useState(false);

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

      <Box
        sx={{
          mb: "20px"
        }}
      >
        <StyledMetadataItem>
          <Typography sx={{ fontSize: "12px" }}>
            We currently only support the{" "}
            <Link
              href="https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-file-manually"
              target="_blank"
              rel="noreferrer"
            >
              Conda environment.yml
            </Link>{" "}
            format. Other environment specification file formats are not
            supported.
          </Typography>
        </StyledMetadataItem>
      </Box>
    </>
  );
};
