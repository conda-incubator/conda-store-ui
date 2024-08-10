import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { DropzoneArea } from "mui-file-dropzone";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { cloneDeep, debounce } from "lodash";
import { stringify } from "yaml";
import { BlockContainerEditMode, AlertDialog } from "../../../../components";
import { ChannelsEdit, updateChannels } from "../../../../features/channels";
import { updateEnvironmentVariables } from "../../../../features/environmentVariables";
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
import { StyledButton } from "../../../../styles";
import { CondaSpecificationPip } from "../../../../common/models";
import LockfileSupportInfo from "../../../../components/LockfileSupportInfo";

interface ISpecificationEdit {
  descriptionUpdated: boolean;
  defaultEnvVersIsChanged: boolean;
  onSpecificationIsChanged: (specificationIsChanged: boolean) => void;
  onDefaultEnvIsChanged: (defaultEnvVersIsChanged: boolean) => void;
  onUpdateEnvironment: (specification: any) => void;
  onShowDialogAlert: (showDialog: boolean) => void;
  isFromLockfile: boolean;
}

export const SpecificationEdit = ({
  descriptionUpdated,
  defaultEnvVersIsChanged,
  onSpecificationIsChanged,
  onDefaultEnvIsChanged,
  onUpdateEnvironment,
  onShowDialogAlert,
  isFromLockfile
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
      dispatch(updateEnvironmentVariables(code.variables));
    } else {
      setCode({
        dependencies: requestedPackages,
        variables: environmentVariables,
        channels
      });
    }

    setShow(value);
  };

  const onCancelEdition = () => {
    setEnvIsUpdated(false);
    onSpecificationIsChanged(false);
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
    dispatch(updatePackages(initialPackages.current));
    dispatch(updateChannels(initialChannels.current));
    dispatch(updateEnvironmentVariables(initialEnvironmentVariables.current));
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

  const [mode, setMode] = React.useState<number>(isFromLockfile ? 1 : 0);
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleSubmit = async () => {
    if (mode === 0) {
      const envContent = show
        ? code
        : {
            dependencies: requestedPackages,
            variables: environmentVariables,
            channels
          };

      onUpdateEnvironment(envContent);
    } else if (files.length) {
      // mode = 1
      const text = await files[0].text();
      onUpdateEnvironment(text);
    }
  };

  return (
    <Box>
      {mode === 0 ? (
        // mode 0 : Specification (as opposed to Lockfile)
        <BlockContainerEditMode
          title="Specification"
          onToggleEditMode={onToggleEditorView}
          isEditMode={show}
          setShowDialog={setShowDialog}
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
                {!isFromLockfile && (
                  // The dependencies list is filled automagically when the page
                  // requests info about the build. But if the environment was
                  // created from a lockfile, showing this list may suggest to
                  // the user that they can build or edit the list of
                  // dependencies manually. But that's not the case with a
                  // lockfile; they are not meant to be edited in a manual way.
                  <Box sx={{ marginBottom: "30px" }}>
                    <Dependencies
                      mode="edit"
                      dependencies={dependencies}
                      hasMore={hasMore}
                      next={() => dispatch(pageChanged(page + 1))}
                      maxWidth={500}
                    />
                  </Box>
                )}
                <Box sx={{ marginBottom: "30px" }}>
                  <ChannelsEdit
                    channelsList={channels}
                    updateChannels={onUpdateChannels}
                    maxWidth={500}
                  />
                </Box>
              </>
            )}
          </Box>
        </BlockContainerEditMode>
      ) : (
        // mode 1 : Lockfile (as opposed to Specification)
        <Box
          sx={{
            border: "1px solid #E0E0E0",
            paddingBottom: "15px"
          }}
        >
          <Box
            sx={{
              padding: "10px 15px",
              borderBottom: "1px solid #E0E0E0"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography
                data-testid="block-container-title"
                sx={{ fontSize: "14px", fontWeight: 600, color: "#333" }}
              >
                Conda Lockfile Upload
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<CodeOutlinedIcon />}
                onClick={() => setShowDialog(true)}
              >
                Switch to Specification
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "15px 15px 0 15px"
            }}
          >
            <DropzoneArea
              fileObjects={files}
              onChange={async files => setFiles(files)}
              filesLimit={1}
              showPreviews={true}
              showPreviewsInDropzone={false}
              showFileNamesInPreview={true}
              previewText=""
            />
            <Box>
              <LockfileSupportInfo />
            </Box>
          </Box>
        </Box>
      )}

      <AlertDialog
        title={`Switch to ${
          mode === 0 ? "Conda Lockfile Upload" : "Specification"
        }`}
        description={`If you switch to ${
          mode === 0 ? "Conda Lockfile Upload" : "Specification"
        }, you ${
          mode === 0 ? "may" : "will"
        } lose your work in this section of the form.`}
        isOpen={showDialog}
        closeAction={() => setShowDialog(false)}
        confirmAction={() => {
          setMode(mode === 0 ? 1 : 0);
          setShowDialog(false);
        }}
        confirmText="Continue"
      />

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
        <StyledButton
          color="primary"
          sx={{ padding: "5px 48px" }}
          onClick={onCancelEdition}
        >
          Cancel
        </StyledButton>
        <StyledButton
          color="primary"
          sx={{ padding: "5px 48px" }}
          onClick={handleSubmit}
          disabled={mode === 0 ? !envIsUpdated : !files?.length}
        >
          Save
        </StyledButton>
      </Box>
    </Box>
  );
};
