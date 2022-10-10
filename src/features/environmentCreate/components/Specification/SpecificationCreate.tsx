import React, { useState } from "react";
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
  editorCodeUpdated
} from "../../environmentCreateSlice";
import { debounce } from "lodash";

export const SpecificationCreate = ({ onCreateEnvironment }: any) => {
  const dispatch = useAppDispatch();
  const { channels, requestedPackages } = useAppSelector(
    state => state.environmentCreate
  );
  const [show, setShow] = useState(false);

  const onUpdateChannels = (channels: string[]) => {
    dispatch(channelsChanged(channels));
  };

  const onUpdateEditor = debounce(
    ({
      channels,
      dependencies
    }: {
      channels: string[];
      dependencies: string[];
    }) => {
      dispatch(editorCodeUpdated({ channels, dependencies }));
    },
    300
  );

  const onToggleEditorView = (value: boolean) => {
    setShow(value);
  };

  const onUpdateEnvironment = () => {
    // if (show) {
    //   setChannels(newChannels);
    //   setPackages(newPackages);
    // }
    // onCreateEnvironment({
    //   channels: channels,
    //   dependencies: newPackages
    // });
  };

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
              <CreateEnvironmentPackages />
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
            onClick={onUpdateEnvironment}
          >
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
