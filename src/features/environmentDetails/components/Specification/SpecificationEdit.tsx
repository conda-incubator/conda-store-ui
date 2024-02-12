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
  defaultEnvVersIsChanged: boolean;
  onSpecificationIsChanged: (specificationIsChanged: boolean) => void;
  onDefaultEnvIsChanged: (defaultEnvVersIsChanged: boolean) => void;
  onUpdateEnvironment: (specification: any) => void;
  onShowDialogAlert: (showDialog: boolean) => void;
}
export const SpecificationEdit = ({
  descriptionUpdated,
  defaultEnvVersIsChanged,
  onSpecificationIsChanged,
  onDefaultEnvIsChanged,
  onUpdateEnvironment,
  onShowDialogAlert
}: ISpecificationEdit) => {
  const { channels } = useAppSelector(state => state.channels);
  const { requestedPackages } = useAppSelector(
    state => state.requestedPackages
  );
  const { environmentVariables } = useAppSelector(
    state => state.environmentVariables
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
    variables: Record<string, string>;
  }>({
    dependencies: requestedPackages,
    variables: environmentVariables,
    channels
  });
  const [envIsUpdated, setEnvIsUpdated] = useState(false);

  const initialChannels = useRef(cloneDeep(channels));
  const initialPackages = useRef(cloneDeep(requestedPackages));
  const initialEnvironmentVariables = useRef(cloneDeep(environmentVariables));

  const stringifiedInitialChannels = useMemo(() => {
    return JSON.stringify(initialChannels.current);
  }, [initialChannels.current]);

  const stringifiedInitialPackages = useMemo(() => {
    return JSON.stringify(initialPackages.current);
  }, [initialPackages.current]);

  const stringifiedInitialEnvironmentVariables = useMemo(() => {
    return JSON.stringify(initialEnvironmentVariables.current);
  }, [initialEnvironmentVariables.current]);

  const onUpdateChannels = useCallback((channels: string[]) => {
    dispatch(updateChannels(channels));
    onDefaultEnvIsChanged(false);
  }, []);

  const onUpdateDefaultEnvironment = (isChanged: boolean) => {
    onDefaultEnvIsChanged(isChanged);
    onSpecificationIsChanged(!isChanged);
  };

  const onUpdateEditor = debounce(
    ({
      channels,
      dependencies,
      variables
    }: {
      channels: string[];
      dependencies: string[];
      variables: Record<string, string>;
    }) => {
      const code = { dependencies, channels, variables };
      const isDifferentChannels =
        JSON.stringify(code.channels) !== stringifiedInitialChannels;
      const isDifferentPackages =
        JSON.stringify(code.dependencies) !== stringifiedInitialPackages;
      const isDifferentEnvironmentVariables =
        JSON.stringify(code.variables) !==
        stringifiedInitialEnvironmentVariables;

      if (!channels || channels.length === 0) {
        code.channels = [];
      }

      if (!dependencies || dependencies.length === 0) {
        code.dependencies = [];
      }

      if (!variables || Object.keys(variables).length === 0) {
        code.variables = {};
      }

      if (
        isDifferentChannels ||
        isDifferentPackages ||
        isDifferentEnvironmentVariables
      ) {
        setEnvIsUpdated(true);
        onUpdateDefaultEnvironment(false);
        onSpecificationIsChanged(true);
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
      setCode({
        dependencies: requestedPackages,
        variables: environmentVariables,
        channels
      });
    }

    setShow(value);
  };

  const onEditEnvironment = () => {
    const envContent = show
      ? code
      : {
          dependencies: requestedPackages,
          variables: environmentVariables,
          channels
        };

    onUpdateEnvironment(envContent);
  };

  const onCancelEdition = () => {
    setEnvIsUpdated(false);
    onSpecificationIsChanged(false);
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
    const isDifferentEnvironmentVariables =
      JSON.stringify(environmentVariables) !==
      stringifiedInitialEnvironmentVariables;

    if (defaultEnvVersIsChanged) {
      setEnvIsUpdated(false);
    } else if (
      isDifferentChannels ||
      isDifferentPackages ||
      isDifferentEnvironmentVariables
    ) {
      setEnvIsUpdated(true);
    }
  }, [channels, requestedPackages, environmentVariables, descriptionUpdated]);

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={onToggleEditorView}
      isEditMode={show}
    >
      <Box>
        {show ? (
          <CodeEditor
            code={stringify({
              channels,
              dependencies: requestedPackages,
              variables: environmentVariables
            })}
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
          >
            Cancel
          </StyledButtonPrimary>
          <StyledButtonPrimary
            sx={{ padding: "5px 48px" }}
            onClick={onEditEnvironment}
            disabled={!envIsUpdated}
          >
            Save
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
