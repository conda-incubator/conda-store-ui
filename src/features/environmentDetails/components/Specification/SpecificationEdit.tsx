import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { cloneDeep, debounce } from "lodash";
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
import { CondaSpecificationPip } from "../../../../common/models";

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
  const [code, setCode] = useState<{
    dependencies: (string | CondaSpecificationPip)[];
    channels: string[];
  }>({ dependencies: requestedPackages, channels });
  const initialChannels = useRef(cloneDeep(channels));
  const initialPackages = useRef(cloneDeep(requestedPackages));

  const onUpdateChannels = (channels: string[]) => {
    dispatch(updateChannels(channels));
  };

  const onUpdateEditor = debounce(
    ({
      channels,
      dependencies
    }: {
      channels: string[];
      dependencies: string[];
    }) => {
      const code = { dependencies, channels };

      if (!channels || channels.length === 0) {
        code.channels = [];
      }

      if (!dependencies || dependencies.length === 0) {
        code.dependencies = [];
      }

      setCode(code);
    },
    300
  );

  const onToggleEditorView = (value: boolean) => {
    if (show) {
      dispatch(updatePackages(code.dependencies));
      dispatch(updateChannels(code.channels));
    }
    setShow(value);
  };

  const onEditEnvironment = () => {
    const envContent = show
      ? code
      : { dependencies: requestedPackages, channels };

    onUpdateEnvironment(envContent);
  };

  const onCancelEdition = () => {
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
    dispatch(updatePackages(initialPackages.current));
    dispatch(updateChannels(initialChannels.current));
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
            code={stringify({ dependencies: requestedPackages, channels })}
            onChangeEditor={onUpdateEditor}
          />
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <RequestedPackagesEdit packageList={requestedPackages} />
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
            onClick={onEditEnvironment}
          >
            Edit
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
