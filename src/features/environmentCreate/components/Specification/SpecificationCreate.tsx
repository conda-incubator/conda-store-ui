import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit } from "../../../../features/channels";
import { BlockContainerEditMode } from "../../../../components";
import { StyledButtonPrimary } from "../../../../styles";
import { CodeEditor } from "../../../../features/yamlEditor";
import { stringify } from "yaml";
import { CreateEnvironmentPackages } from "../CreateEnvironmentPackages";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  channelsChanged,
  codeEditorExited,
  codeEditorContentChanged,
  showCodeEditorChanged
} from "../../environmentCreateSlice";
import { getStylesForStyleType } from "../../../../utils/helpers";
import parseCodeEditorContent from "../../../../utils/helpers/parseCodeEditorContent";

export const SpecificationCreate = ({
  onCreateEnvironment,
  namespaceName
}: any) => {
  const dispatch = useAppDispatch();
  const {
    channels,
    requestedPackages,
    environmentVariables,
    showCodeEditor,
    codeEditorContent
  } = useAppSelector(
    state =>
      state.environmentCreate[`${namespaceName}/new-environment`] ||
      state.environmentCreate[""]
  );

  const buttonStyles = getStylesForStyleType(
    { padding: "5px 60px" },
    { padding: "5px 48px" }
  );

  const onUpdateChannels = useCallback(
    (channels: string[]) => {
      dispatch(channelsChanged([`${namespaceName}/new-environment`, channels]));
    },
    [namespaceName]
  );

  const onToggleCodeEditor = (shouldShowCodeEditor: boolean) => {
    if (!shouldShowCodeEditor) {
      // YAML Code Editor -> GUI

      // Push code editor values into GUI
      try {
        const { channels, dependencies, variables } =
          parseCodeEditorContent(codeEditorContent);
        dispatch(
          codeEditorExited([
            `${namespaceName}/new-environment`,
            {
              channels,
              requestedPackages: dependencies,
              environmentVariables: variables
            }
          ])
        );
      } catch (_err) {
        // do nothing
      }
    } else if (channels.length || requestedPackages.length) {
      // GUI -> YAML Code Editor

      // Try to push GUI values into code editor
      try {
        dispatch(
          codeEditorContentChanged([
            `${namespaceName}/new-environment`,
            stringify({
              ...parseCodeEditorContent(codeEditorContent),
              channels,
              dependencies: requestedPackages
            })
          ])
        );
      } catch (_err) {
        // do nothing
      }
    }

    dispatch(
      showCodeEditorChanged([
        `${namespaceName}/new-environment`,
        shouldShowCodeEditor
      ])
    );
  };

  const handleSubmit = () => {
    const yaml = showCodeEditor
      ? codeEditorContent
      : stringify({
          dependencies: requestedPackages,
          variables: environmentVariables,
          channels
        });

    onCreateEnvironment(yaml);
  };

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={onToggleCodeEditor}
      isEditMode={showCodeEditor}
    >
      <Box>
        {showCodeEditor ? (
          <CodeEditor
            code={codeEditorContent}
            onChangeEditor={code =>
              dispatch(
                codeEditorContentChanged([
                  `${namespaceName}/new-environment`,
                  code
                ])
              )
            }
          />
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <CreateEnvironmentPackages
                namespaceName={namespaceName}
                requestedPackages={requestedPackages}
              />
            </Box>
            <Box sx={{ margiBottom: "30px" }}>
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
            justifyContent: "center",
            marginTop: "30px",
            marginBottom: "10px"
          }}
        >
          <StyledButtonPrimary sx={buttonStyles} onClick={handleSubmit}>
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
