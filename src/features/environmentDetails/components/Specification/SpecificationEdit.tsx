import React, { useState, useEffect, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { debounce } from "lodash";
import { stringify, parse } from "yaml";
import { BlockContainerEditMode } from "../../../../components";
import { ChannelsEdit } from "../../../../features/channels";
import { Dependencies, pageChanged } from "../../../../features/dependencies";
import {
  modeChanged,
  EnvironmentDetailsModes
} from "../../../../features/environmentDetails";
import { RequestedPackagesEdit } from "../../../../features/requestedPackages";
import { CodeEditor } from "../../../../features/yamlEditor";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { StyledButtonPrimary } from "../../../../styles";
import {
  channelsChanged,
  requestedPackagesChanged,
  codeEditorExited,
  codeEditorContentChanged,
  showCodeEditorChanged,
  environmentVariablesChanged
} from "../../../environmentCreate/environmentCreateSlice";
import parseCodeEditorContent from "../../../../utils/helpers/parseCodeEditorContent";

interface ISpecificationEdit {
  environmentName: string;
  namespaceName: string;
  descriptionUpdated: boolean;
  defaultEnvVersIsChanged: boolean;
  onSpecificationIsChanged: (specificationIsChanged: boolean) => void;
  onDefaultEnvIsChanged: (defaultEnvVersIsChanged: boolean) => void;
  onUpdateEnvironment: (specification: any) => void;
  onShowDialogAlert: (showDialog: boolean) => void;
}
export const SpecificationEdit = ({
  environmentName,
  namespaceName,
  descriptionUpdated,
  defaultEnvVersIsChanged,
  onSpecificationIsChanged,
  onDefaultEnvIsChanged,
  onUpdateEnvironment,
  onShowDialogAlert
}: ISpecificationEdit) => {
  const { channels: initialChannels } = useAppSelector(state => state.channels);
  const { requestedPackages: initialRequestedPackages } = useAppSelector(
    state => state.requestedPackages
  );
  const { environmentVariables: initialEnvironmentVariables } = useAppSelector(
    state => state.environmentVariables
  );
  const { dependencies, size, count, page } = useAppSelector(
    state => state.dependencies
  );
  const hasMore = size * page <= count;
  const dispatch = useAppDispatch();

  const {
    channels,
    requestedPackages,
    environmentVariables,
    codeEditorContent,
    showCodeEditor
  } = useAppSelector(
    state =>
      state.environmentCreate[`${namespaceName}/${environmentName}`] ||
      state.environmentCreate[""]
  );

  console.log(
    "rendering Specification Edit, requestedPackages",
    requestedPackages
  );

  const [envIsUpdated, setEnvIsUpdated] = useState(false);

  // const initialChannels = useRef(cloneDeep(channels));
  // const initialPackages = useRef(cloneDeep(requestedPackages));
  // const initialEnvironmentVariables = useRef(cloneDeep(environmentVariables));

  const formKey = `${namespaceName}/${environmentName}`;
  useEffect(() => {
    dispatch(channelsChanged([formKey, initialChannels]));
  }, [initialChannels]);

  useEffect(() => {
    dispatch(requestedPackagesChanged([formKey, initialRequestedPackages]));
  }, [initialRequestedPackages]);

  useEffect(() => {
    dispatch(
      environmentVariablesChanged([formKey, initialEnvironmentVariables])
    );
  }, [initialEnvironmentVariables]);

  const stringifiedInitialChannels = useMemo(() => {
    return JSON.stringify(initialChannels);
  }, [initialChannels]);

  const stringifiedInitialPackages = useMemo(() => {
    return JSON.stringify(initialRequestedPackages);
  }, [initialRequestedPackages]);

  const stringifiedInitialEnvironmentVariables = useMemo(() => {
    return JSON.stringify(initialEnvironmentVariables);
  }, [initialEnvironmentVariables]);

  const onUpdateChannels = useCallback(
    (channels: string[]) => {
      dispatch(
        channelsChanged([`${namespaceName}/${environmentName}`, channels])
      );
      onDefaultEnvIsChanged(false);
    },
    [namespaceName, environmentName]
  );

  const onUpdateDefaultEnvironment = (isChanged: boolean) => {
    onDefaultEnvIsChanged(isChanged);
    onSpecificationIsChanged(!isChanged);
  };

  const onUpdateEditor = debounce((code: string) => {
    try {
      const { channels, dependencies, variables } = parse(code);
      const isDifferentChannels =
        JSON.stringify(channels) !== stringifiedInitialChannels;
      const isDifferentPackages =
        JSON.stringify(dependencies) !== stringifiedInitialPackages;
      const isDifferentEnvironmentVariables =
        JSON.stringify(variables) !== stringifiedInitialEnvironmentVariables;
      if (
        isDifferentChannels ||
        isDifferentPackages ||
        isDifferentEnvironmentVariables
      ) {
        setEnvIsUpdated(true);
        onUpdateDefaultEnvironment(false);
        onSpecificationIsChanged(true);
      }
    } catch (_err) {
      // do nothing
    }

    dispatch(
      codeEditorContentChanged([`${namespaceName}/${environmentName}`, code])
    );
  }, 200);

  const onToggleCodeEditor = (shouldShowCodeEditor: boolean) => {
    if (!shouldShowCodeEditor) {
      // YAML Code Editor -> GUI

      // Try to push code editor values into GUI
      try {
        const { channels, dependencies, variables } =
          parseCodeEditorContent(codeEditorContent);
        dispatch(
          codeEditorExited([
            `${namespaceName}/${environmentName}`,
            {
              channels,
              requestedPackages: dependencies,
              environmentVariables: variables
            }
          ])
        );
      } catch (_err) {
        // do nothing
      }
    } else {
      // GUI -> YAML Code Editor

      try {
        const spec = parseCodeEditorContent(codeEditorContent);
        dispatch(
          codeEditorContentChanged([
            `${namespaceName}/${environmentName}`,
            stringify(
              codeEditorContent === "" &&
                channels === initialChannels &&
                requestedPackages === initialRequestedPackages &&
                environmentVariables === initialEnvironmentVariables
                ? {
                    channels: initialChannels,
                    dependencies: initialRequestedPackages,
                    variables: initialEnvironmentVariables
                  }
                : {
                    ...spec,
                    channels,
                    dependencies: requestedPackages
                  }
            )
          ])
        );
      } catch (_err) {
        // do nothing
      }
    }

    dispatch(
      showCodeEditorChanged([
        `${namespaceName}/${environmentName}`,
        shouldShowCodeEditor
      ])
    );
  };

  const onEditEnvironment = () => {
    const yaml = showCodeEditor
      ? codeEditorContent
      : stringify({
          dependencies: requestedPackages,
          variables: environmentVariables,
          channels
        });

    onUpdateEnvironment(yaml);
  };

  const onCancelEdition = () => {
    setEnvIsUpdated(false);
    onSpecificationIsChanged(false);
    dispatch(modeChanged(EnvironmentDetailsModes.READ));
    // dispatch(updatePackages(initialPackages.current));
    // dispatch(updateChannels(initialChannels.current));
    // dispatch(updateEnvironmentVariables(initialEnvironmentVariables.current));
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
      onToggleEditMode={onToggleCodeEditor}
      isEditMode={showCodeEditor}
    >
      <Box>
        {showCodeEditor ? (
          <CodeEditor
            // code={stringify({
            //   channels,
            //   dependencies: requestedPackages,
            //   variables: environmentVariables
            // })}
            code={codeEditorContent}
            onChangeEditor={onUpdateEditor}
          />
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <RequestedPackagesEdit
                environmentName={environmentName}
                namespaceName={namespaceName}
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
