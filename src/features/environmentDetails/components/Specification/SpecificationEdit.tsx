import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
interface ISpecificationEdit {
  descriptionUpdated: boolean;
  defaultEnvIsChanged: boolean;
  onDefaultEnvIsChanged: (defaultEnvIsChanged: boolean) => void;
  onUpdateEnvironment: (specification: any) => void;
  onShowDialogAlert: (showDialog: boolean) => void;
}
export const SpecificationEdit = ({
  descriptionUpdated,
  defaultEnvIsChanged,
  onDefaultEnvIsChanged,
  onUpdateEnvironment,
  onShowDialogAlert
}: ISpecificationEdit) => {
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
  const [envIsUpdated, setEnvIsUpdated] = useState(false);

  const initialChannels = useRef(cloneDeep(channels));
  const initialPackages = useRef(cloneDeep(requestedPackages));

  const stringifiedInitialChannels = useMemo(() => {
    return JSON.stringify(initialChannels.current);
  }, [initialChannels.current]);

  const stringifiedInitialPackages = useMemo(() => {
    return JSON.stringify(initialPackages.current);
  }, [initialPackages.current]);

  const onUpdateChannels = useCallback((channels: string[]) => {
    dispatch(updateChannels(channels));
    onDefaultEnvIsChanged(false);
  }, []);

  const onUpdateDefaultEnvironment = (isChanged: boolean) => {
    onDefaultEnvIsChanged(isChanged);
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
      const isDifferentChannels =
        JSON.stringify(code.channels) !== stringifiedInitialChannels;
      const isDifferentPackages =
        JSON.stringify(code.dependencies) !== stringifiedInitialPackages;

      if (!channels || channels.length === 0) {
        code.channels = [];
      }

      if (!dependencies || dependencies.length === 0) {
        code.dependencies = [];
      }

      if (isDifferentChannels || isDifferentPackages) {
        setEnvIsUpdated(true);
        onUpdateDefaultEnvironment(false);
      }

      setCode(code);
    },
    200
  );

  const onToggleEditorView = (value: boolean) => {
    if (show) {
      dispatch(updatePackages(code.dependencies));
      dispatch(updateChannels(code.channels));
    } else {
      setCode({ dependencies: requestedPackages, channels });
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
    setEnvIsUpdated(false);
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
    dispatch(updatePackages(initialPackages.current));
    dispatch(updateChannels(initialChannels.current));
  };

  useEffect(() => {
    if (descriptionUpdated) {
      setEnvIsUpdated(true);
    }

    const isDifferentChannels =
      JSON.stringify(channels) !== stringifiedInitialChannels;
    const isDifferentPackages =
      JSON.stringify(requestedPackages) !== stringifiedInitialPackages;

    if (defaultEnvIsChanged) {
      setEnvIsUpdated(false);
    } else if (isDifferentChannels || isDifferentPackages) {
      setEnvIsUpdated(true);
    }
  }, [channels, requestedPackages, descriptionUpdated]);

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={onToggleEditorView}
      isEditMode={show}
    >
      <Box>
        {show ? (
          <CodeEditor
            code={stringify({ channels, dependencies: requestedPackages })}
            onChangeEditor={onUpdateEditor}
          />
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <RequestedPackagesEdit
                packageList={requestedPackages}
                onDefaultEnvIsChanged={onUpdateDefaultEnvironment}
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
            onClick={() => onShowDialogAlert(true)}
          >
            Delete environment
          </Typography>
          <StyledButtonPrimary
            sx={{ padding: "5px 48px" }}
            onClick={onCancelEdition}
            isalttype="true"
          >
            Cancel
          </StyledButtonPrimary>
          <StyledButtonPrimary
            sx={{ padding: "5px 48px" }}
            onClick={onEditEnvironment}
            disabled={!envIsUpdated}
            isalttype="true"
          >
            Save
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
