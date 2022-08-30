import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit } from "src/features/channels";
import { Dependencies, pageChanged } from "src/features/dependencies";
import { updateChannels } from "src/features/channels";
import {
  RequestedPackagesEdit,
  updatePackages
} from "src/features/requestedPackages";
import { BlockContainerEditMode } from "src/components";
import { StyledButtonPrimary } from "src/styles";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { CodeEditor } from "src/features/yamlEditor";
import { stringify } from "yaml";

export const SpecificationEdit = ({ onUpdateEnvironment }: any) => {
  const { channels } = useAppSelector(state => state.channels);
  const { requestedPackages } = useAppSelector(
    state => state.requestedPackages
  );
  const { dependencies, size, count, page } = useAppSelector(
    state => state.dependencies
  );
  const hasMore = size * page <= count;
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [code, setCode] = useState({
    channels,
    dependencies: requestedPackages
  });
  const [newChannels, setNewChannels] = useState(channels);
  const [newPackages, setNewPackages] = useState(requestedPackages);

  const onUpdatePackages = (packages: string[]) => {
    dispatch(updatePackages(packages));
    setNewPackages(packages);
  };

  const onUpdateChannels = (channels: string[]) => {
    dispatch(updateChannels(channels));
    setNewChannels(channels);
  };

  const onUpdateEditor = ({ channels, dependencies }: any) => {
    setNewChannels(channels);
    setNewPackages(dependencies);
  };

  const onToggleEditorView = (value: boolean) => {
    setShow(value);
    if (!value) {
      // If user want to switch the yaml editor view, let's send this info to the component
      dispatch(updateChannels(newChannels));
      dispatch(updatePackages(newPackages));
    }
  };

  const onEditEnvironment = () => {
    if (show) {
      // If user is using the yaml editor, before make the request update the store
      dispatch(updateChannels(newChannels));
      dispatch(updatePackages(newPackages));
    }

    onUpdateEnvironment({
      channels: newChannels,
      dependencies: newPackages
    });
  };

  useEffect(() => {
    setCode({
      channels,
      dependencies: requestedPackages
    });
  }, [channels, requestedPackages]);

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={onToggleEditorView}
      isEditMode={show}
    >
      <Box sx={{ padding: "13px 19px" }}>
        {show ? (
          <CodeEditor code={stringify(code)} onChangeEditor={onUpdateEditor} />
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <RequestedPackagesEdit
                packageList={requestedPackages}
                updatePackages={onUpdatePackages}
              />
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <Dependencies
                mode="edit"
                dependencies={dependencies}
                hasMore={hasMore}
                next={() => dispatch(pageChanged(page + 1))}
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
            onClick={() => onEditEnvironment()}
          >
            Edit
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
