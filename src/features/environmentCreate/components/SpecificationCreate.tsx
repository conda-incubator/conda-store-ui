import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit } from "src/features/channels";
import { RequestedPackagesEdit } from "src/features/requestedPackages";
import { BlockContainerEditMode } from "src/components";
import { StyledButtonPrimary } from "src/styles";
import { CodeEditor } from "src/features/yamlEditor";
import { stringify } from "yaml";

export const SpecificationCreate = ({ onCreateEnvironment }: any) => {
  const [show, setShow] = useState(false);
  const [channels, setChannels] = useState([]);
  const [requestedPackages, setPackages] = useState([]);
  const [newChannels, setNewChannels] = useState(channels);
  const [newPackages, setNewPackages] = useState(requestedPackages);
  const [code, setCode] = useState({
    channels,
    dependencies: requestedPackages
  });

  const onUpdateChannels = (channels: []) => {
    setChannels(channels);
  };

  const onUpdatePackages = (packages: []) => {
    setPackages(packages);
  };

  const onUpdateEditor = ({ channels, dependencies }: any) => {
    setNewChannels(channels);
    setNewPackages(dependencies);
  };

  const onToggleEditorView = (value: boolean) => {
    setShow(value);
    if (!value) {
      // If user want to switch the yaml editor view, let's send this info to the component
      setChannels(newChannels);
      setPackages(newPackages);
    }
  };

  const onUpdateEnvironment = () => {
    if (show) {
      setChannels(newChannels);
      setPackages(newPackages);
    }
    onCreateEnvironment({
      channels: newChannels,
      dependencies: newPackages
    });
  };

  useEffect(() => {
    setCode({
      channels,
      dependencies: requestedPackages
    });
    setNewChannels(channels);
    setNewPackages(requestedPackages);
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
