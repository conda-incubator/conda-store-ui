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
import { getStylesForStyleType } from "../../../../utils/helpers";

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

  const buttonStyles = getStylesForStyleType(
    { padding: "5px 60px" },
    { padding: "5px 48px" }
  );

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

  const formatCode = (channels: string[], dependencies: string[]) => {
    if (channels.length === 0 && dependencies.length === 0) {
      return "channels:\n  -\ndependencies:\n  -";
    }
    return stringify({ channels, dependencies: dependencies });
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
      <Box>
        {show ? (
          <CodeEditor
            code={formatCode(channels, requestedPackages)}
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
            sx={buttonStyles}
            onClick={handleSubmit}
            isalttype="true"
          >
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
