import React, { useCallback, useEffect, useState } from "react";
import { DropzoneArea } from "mui-file-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChannelsEdit } from "../../../../features/channels";
import { BlockContainerEditMode, AlertDialog } from "../../../../components";
import { StyledButton } from "../../../../styles";
import { CodeEditor } from "../../../../features/yamlEditor";
import { stringify } from "yaml";
import { CreateEnvironmentPackages } from "../CreateEnvironmentPackages";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  channelsChanged,
  editorCodeUpdated,
  environmentCreateStateCleared
} from "../../environmentCreateSlice";
import { getStylesForStyleType } from "../../../../utils/helpers";
import CondaLockfileInfo from "../../../../components/CondaLockfileInfo";

export const SpecificationCreate = ({ onCreateEnvironment }: any) => {
  const dispatch = useAppDispatch();
  const { channels, requestedPackages, environmentVariables } = useAppSelector(
    state => state.environmentCreate
  );
  const [show, setShow] = useState(false);
  const [editorContent, setEditorContent] = useState<{
    channels: string[];
    dependencies: string[];
    variables: Record<string, string>;
  }>({ channels: [], dependencies: [], variables: {} });

  const buttonStyles = getStylesForStyleType(
    { padding: "5px 60px" },
    { padding: "5px 48px" }
  );

  const onUpdateChannels = useCallback((channels: string[]) => {
    dispatch(channelsChanged(channels));
  }, []);

  const onUpdateEditor = ({
    channels,
    dependencies,
    variables
  }: {
    channels: string[];
    dependencies: string[];
    variables: Record<string, string>;
  }) => {
    const code = { channels, dependencies, variables };

    // Note: the [null] checks are due to empty lists in the pretty-printed case
    // of formatCode
    if (
      !channels ||
      channels.length === 0 ||
      (channels.length === 1 && channels[0] === null)
    ) {
      code.channels = [];
    }

    if (
      !dependencies ||
      dependencies.length === 0 ||
      (dependencies.length === 1 && dependencies[0] === null)
    ) {
      code.dependencies = [];
    }

    if (!variables || Object.keys(variables).length === 0) {
      code.variables = {};
    }

    setEditorContent(code);
  };

  const onToggleEditorView = (value: boolean) => {
    if (show) {
      dispatch(
        editorCodeUpdated({
          channels: editorContent.channels,
          dependencies: editorContent.dependencies,
          variables: editorContent.variables
        })
      );
    } else {
      setEditorContent({
        dependencies: requestedPackages,
        variables: environmentVariables,
        channels
      });
    }

    setShow(value);
  };

  const formatCode = (
    channels: string[],
    dependencies: string[],
    variables: Record<string, string>
  ) => {
    if (channels.length === 0 && dependencies.length === 0) {
      // Note: these empty pretty-printed lists translate to [null]
      return "channels:\n  -\ndependencies:\n  -\n" + stringify({ variables });
    }
    return stringify({ channels, dependencies, variables });
  };

  const [mode, setMode] = React.useState<number>(0);
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleSubmit = async () => {
    if (mode === 0) {
      const code = show
        ? editorContent
        : {
            dependencies: requestedPackages,
            variables: environmentVariables,
            channels
          };

      onCreateEnvironment(code);
    } else if (files.length) {
      // mode = 1
      const text = await files[0].text();
      onCreateEnvironment(text);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(environmentCreateStateCleared());
    };
  }, []);

  return (
    <Box>
      {mode === 0 ? (
        <BlockContainerEditMode
          title="Specification"
          onToggleEditMode={onToggleEditorView}
          isEditMode={show}
        >
          <Box>
            {show ? (
              <CodeEditor
                code={formatCode(
                  channels,
                  requestedPackages,
                  environmentVariables
                )}
                onChangeEditor={onUpdateEditor}
              />
            ) : (
              <>
                <Box sx={{ marginBottom: "30px" }}>
                  <CreateEnvironmentPackages
                    requestedPackages={requestedPackages}
                  />
                </Box>
                <Box sx={{ marginBottom: "30px" }}>
                  <ChannelsEdit
                    channelsList={channels}
                    updateChannels={onUpdateChannels}
                  />
                </Box>
              </>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: "30px",
                marginTop: "45px",
                marginBottom: "10px"
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#333",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                onClick={() => setShowDialog(true)}
              >
                Switch to Conda Lockfile Upload
              </Typography>
            </Box>
          </Box>
        </BlockContainerEditMode>
      ) : (
        <Box
          sx={{
            border: "1px solid #E0E0E0",
            paddingBottom: "15px"
          }}
        >
          <Box
            sx={{
              padding: "10px 15px",
              borderBottom: "1px solid #E0E0E0"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography
                data-testid="block-container-title"
                sx={{ fontSize: "14px", fontWeight: 600, color: "#333" }}
              >
                <CondaLockfileInfo />
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "15px 15px 0 15px"
            }}
          >
            <DropzoneArea
              fileObjects={files}
              onChange={async files => setFiles(files)}
              filesLimit={1}
              showPreviews={true}
              showPreviewsInDropzone={false}
              showFileNamesInPreview={true}
              previewText=""
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: "30px",
                marginTop: "45px",
                marginBottom: "10px"
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#333",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                onClick={() => setShowDialog(true)}
              >
                Switch to Specification
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <AlertDialog
        title={`Switch to ${
          mode === 0 ? "Conda Lockfile Upload" : "Specification"
        }`}
        description={`If you switch to ${
          mode === 0 ? "Conda Lockfile Upload" : "Specification"
        }, you may lose your work in this section of the form.`}
        isOpen={showDialog}
        closeAction={() => setShowDialog(false)}
        confirmAction={() => {
          setMode(mode === 0 ? 1 : 0);
          setShowDialog(false);
        }}
        confirmText="Continue"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "10px"
        }}
      >
        <StyledButton
          color="primary"
          sx={buttonStyles}
          onClick={handleSubmit}
          disabled={mode === 1 && !files?.length}
        >
          Create
        </StyledButton>
      </Box>
    </Box>
  );
};
