import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { cloneDeep, debounce } from "lodash";
import { stringify } from "yaml";
import { BlockContainerEditMode } from "../../../../components";
import { ChannelsEdit, updateChannels } from "../../../../features/channels";
import { updateEnvironmentVariables } from "../../../../features/environmentVariables";
import { updateLockfile } from "../../../../features/lockfile";
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
import type {
  CondaSpecificationPip,
  Lockfile
} from "../../../../common/models";

interface ISpecificationEdit {
  descriptionUpdated: boolean;
  defaultEnvVersIsChanged: boolean;
  onSpecificationIsChanged: (specificationIsChanged: boolean) => void;
  onDefaultEnvIsChanged: (defaultEnvVersIsChanged: boolean) => void;
  onUpdateEnvironment: (specification: any, isLockfile: boolean) => void;
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
  const { lockfile } = useAppSelector(state => state.lockfile);
  const hasMore = size * page <= count;
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [specificationType, setSpecificationType] = React.useState(
    Object.keys(lockfile).length === 0 ? "specification" : "lockfile"
  );
  const [code, setCode] = useState<{
    dependencies: (string | CondaSpecificationPip)[];
    channels: string[];
    variables: Record<string, string>;
  }>({
    dependencies: requestedPackages,
    variables: environmentVariables,
    channels
  });
  const [codeLockfile, setCodeLockfile] = useState<Lockfile>(lockfile);
  const [envIsUpdated, setEnvIsUpdated] = useState(false);

  const initialChannels = useRef(cloneDeep(channels));
  const initialPackages = useRef(cloneDeep(requestedPackages));
  const initialEnvironmentVariables = useRef(cloneDeep(environmentVariables));
  const initialLockfile = useRef(cloneDeep(lockfile));

  const stringifiedInitialChannels = useMemo(() => {
    return JSON.stringify(initialChannels.current);
  }, [initialChannels.current]);

  const stringifiedInitialPackages = useMemo(() => {
    return JSON.stringify(initialPackages.current);
  }, [initialPackages.current]);

  const stringifiedInitialEnvironmentVariables = useMemo(() => {
    return JSON.stringify(initialEnvironmentVariables.current);
  }, [initialEnvironmentVariables.current]);

  const stringifiedInitialLockfile = useMemo(() => {
    return JSON.stringify(initialLockfile.current);
  }, [initialLockfile.current]);

  const onUpdateSpecificationType = (event: SelectChangeEvent) => {
    setSpecificationType(event.target.value as string);
  };

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

  const onUpdateEditorLockfile = debounce((lockfile: Lockfile) => {
    const isDifferentLockfile =
      JSON.stringify(lockfile) !== stringifiedInitialLockfile;

    if (isDifferentLockfile) {
      setEnvIsUpdated(true);
      onUpdateDefaultEnvironment(false);
      onSpecificationIsChanged(true);
    }

    setCodeLockfile(lockfile);
  }, 200);

  const onToggleEditorView = (value: boolean) => {
    if (show) {
      // Code Editor -> GUI
      if (specificationType === "specification") {
        dispatch(updatePackages(code.dependencies));
        dispatch(updateChannels(code.channels));
        dispatch(updateEnvironmentVariables(code.variables));
      } else {
        // TODO: sync GUI with lockfile code
      }
    } else {
      // GUI -> Code Editor
      setCode({
        dependencies: requestedPackages,
        variables: environmentVariables,
        channels
      });
      // TODO: sync lockfile code with GUI
    }

    setShow(value);
  };

  const onEditEnvironment = () => {
    let envContent;
    let isLockfile;

    if (show) {
      if (specificationType === "specification") {
        envContent = code;
        isLockfile = false;
      } else {
        envContent = codeLockfile;
        isLockfile = true;
      }
    } else {
      envContent = {
        dependencies: requestedPackages,
        variables: environmentVariables,
        channels
      };
      isLockfile = false;
    }

    onUpdateEnvironment(envContent, isLockfile);
  };

  const onCancelEdition = () => {
    setEnvIsUpdated(false);
    onSpecificationIsChanged(false);
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
    dispatch(updatePackages(initialPackages.current));
    dispatch(updateChannels(initialChannels.current));
    dispatch(updateEnvironmentVariables(initialEnvironmentVariables.current));
    dispatch(updateLockfile(initialLockfile.current));
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
    const isDifferentLockfile =
      JSON.stringify(lockfile) !== stringifiedInitialLockfile;

    if (defaultEnvVersIsChanged) {
      setEnvIsUpdated(false);
    } else if (
      isDifferentChannels ||
      isDifferentPackages ||
      isDifferentEnvironmentVariables ||
      isDifferentLockfile
    ) {
      setEnvIsUpdated(true);
    }
  }, [
    channels,
    requestedPackages,
    environmentVariables,
    lockfile,
    descriptionUpdated
  ]);

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={onToggleEditorView}
      isEditMode={show}
    >
      <Box>
        {show ? (
          <>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="editor-format-select-label">Format</InputLabel>
              <Select
                labelId="editor-format-select-label"
                label="Format"
                value={specificationType}
                onChange={onUpdateSpecificationType}
                displayEmpty
              >
                <MenuItem value="specification">Specification</MenuItem>
                <MenuItem value="lockfile">Unified lockfile</MenuItem>
              </Select>
            </FormControl>
            {specificationType === "specification" ? (
              <CodeEditor
                code={stringify({
                  channels,
                  dependencies: requestedPackages,
                  variables: environmentVariables
                })}
                onChangeEditor={onUpdateEditor}
              />
            ) : (
              <CodeEditor
                code={stringify(lockfile)}
                onChangeEditor={onUpdateEditorLockfile}
              />
            )}
          </>
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
