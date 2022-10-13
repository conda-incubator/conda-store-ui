import React, { useCallback, useEffect, useState } from "react";
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
  editorCodeUpdated,
  environmentCreateStateCleared
} from "../../environmentCreateSlice";

export const SpecificationCreate = ({ onCreateEnvironment }: any) => {
  const dispatch = useAppDispatch();
  const { channels, requestedPackages } = useAppSelector(
    state => state.environmentCreate
  );
  const [show, setShow] = useState(false);
  const [editorContent, setEditorContent] = useState<{
    channels: string[];
    dependencies: string[];
  }>({ channels: [], dependencies: [] });

  const onUpdateChannels = useCallback((channels: string[]) => {
    dispatch(channelsChanged(channels));
  }, []);

  const onUpdateEditor = ({
    channels,
    dependencies
  }: {
    channels: string[];
    dependencies: string[];
  }) => {
    const code = { channels, dependencies };

    if (!channels || channels.length === 0) {
      code.channels = [];
    }

    if (!dependencies || dependencies.length === 0) {
      code.dependencies = [];
    }

    setEditorContent(code);
  };

  const onToggleEditorView = (value: boolean) => {
    if (show) {
      dispatch(
        editorCodeUpdated({
          channels: editorContent.channels,
          dependencies: editorContent.dependencies
        })
      );
    } else {
      setEditorContent({ dependencies: requestedPackages, channels });
    }

    setShow(value);
  };

  const handleSubmit = () => {
    const code = show
      ? editorContent
      : { dependencies: requestedPackages, channels };

    onCreateEnvironment(code);
  };

  useEffect(() => {
    return () => {
      dispatch(environmentCreateStateCleared());
    };
  }, []);

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={onToggleEditorView}
      isEditMode={show}
    >
      <Box sx={{ padding: "13px 19px" }}>
        {show ? (
          <CodeEditor
            code={stringify({
              channels,
              dependencies: requestedPackages
            })}
            onChangeEditor={onUpdateEditor}
          />
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <CreateEnvironmentPackages
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
          <StyledButtonPrimary
            sx={{ padding: "5px 60px" }}
            onClick={handleSubmit}
          >
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
