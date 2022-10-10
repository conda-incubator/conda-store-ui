import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit } from "../../../../features/channels";
import { BlockContainerEditMode } from "../../../../components";
import { StyledButtonPrimary } from "../../../../styles";
import { CodeEditor } from "../../../../features/yamlEditor";
import { stringify } from "yaml";
import { CreateEnvironmentPackages } from "../CreateEnvironmentPackages";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { channelsChanged } from "../../environmentCreateSlice";

export const SpecificationCreate = ({ onCreateEnvironment }: any) => {
  const dispatch = useAppDispatch();
  const { channels } = useAppSelector(state => state.environmentCreate);
  const [show, setShow] = useState(false);
  // const [channels, setChannels] = useState<string[]>([]);
  // const [requestedPackages, setPackages] = useState<string[]>([]);
  // const [newChannels, setNewChannels] = useState(channels);
  // const [newPackages, setNewPackages] = useState(requestedPackages);
  const [code, setCode] = useState({
    channels,
    dependencies: []
  });

  const onUpdateChannels = (channels: string[]) => {
    dispatch(channelsChanged(channels));
  };

  // const onUpdatePackages = (packages: string[]) => {
  //   setPackages(packages);
  // };

  const onUpdateEditor = ({ channels, dependencies }: any) => {
    // setNewChannels(channels);
    // setNewPackages(dependencies);
  };

  const onToggleEditorView = (value: boolean) => {
    setShow(value);
    // if (!value) {
    //   // If user want to switch the yaml editor view, let's send this info to the component
    //   setChannels(newChannels);
    //   setPackages(newPackages);
    // }
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

  useEffect(() => {
    setCode({
      channels,
      dependencies: []
    });
    // setNewChannels(channels);
    // setNewPackages(requestedPackages);
  }, [channels]);

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
              {/* <RequestedPackagesEdit
                packageList={requestedPackages}
                updatePackages={onUpdatePackages}
                isCreating={true}
              /> */}
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
