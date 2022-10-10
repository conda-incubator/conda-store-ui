import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import { stringify } from "yaml";

import { BlockContainerEditMode } from "../../../../components";
import { ChannelsEdit, updateChannels } from "../../../../features/channels";
import { Dependencies, pageChanged } from "../../../../features/dependencies";
import {
  modeChanged,
  EnvironmentDetailsModes
} from "../../../../features/environmentDetails";
import {
  RequestedPackagesEdit,
  updatePackages
} from "../../../../features/requestedPackages";
import { CodeEditor } from "../../../../features/yamlEditor";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { StyledButtonPrimary } from "../../../../styles";

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
  const [code, setCode] = useState({});
  const [newChannels, setNewChannels] = useState(channels);
  const [backupChannels] = useState(cloneDeep(channels));
  const [newPackages, setNewPackages] = useState(requestedPackages);
  const [backupPackages] = useState(cloneDeep(requestedPackages));

  const onUpdatePackages = (packages: string[]) => {
    dispatch(updatePackages(packages));
    setNewPackages(packages);
  };

  const onUpdateChannels = (channels: string[]) => {
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
      dispatch(updatePackages(newPackages));
    }
    dispatch(updateChannels(newChannels));
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

  const onCancelEdition = () => {
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
    dispatch(updatePackages(backupPackages));
    dispatch(updateChannels(backupChannels));
  };

  useEffect(() => {
    if (channels.length) {
      setCode({
        channels,
        dependencies: requestedPackages
      });
    } else {
      setCode({
        dependencies: requestedPackages
      });
    }
  }, [channels, requestedPackages]);

  useEffect(() => {
    setNewPackages(requestedPackages);
  }, [requestedPackages]);

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
            justifyContent: "space-around",
            marginTop: "30px",
            marginBottom: "10px"
          }}
        >
          <StyledButtonPrimary
            sx={{ padding: "5px 60px" }}
            onClick={() => onCancelEdition()}
          >
            Cancel
          </StyledButtonPrimary>
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
