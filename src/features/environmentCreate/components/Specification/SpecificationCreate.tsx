import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit } from "../../../../features/channels";
import { BlockContainerEditMode } from "../../../../components";
import { StyledButtonPrimary } from "../../../../styles";
import { CodeEditor } from "../../../../features/yamlEditor";
import { stringify } from "yaml";
import { CreateEnvironmentPackages } from "../CreateEnvironmentPackages";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  channelsChanged,
  editorCodeUpdated,
  environmentCreateStateCleared
} from "../../environmentCreateSlice";
import { getStylesForStyleType } from "../../../../utils/helpers";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export const SpecificationCreate = ({ onCreateEnvironment }: any) => {
  const dispatch = useAppDispatch();
  const { channels, requestedPackages, environmentVariables } = useAppSelector(
    state => state.environmentCreate
  );
  const [show, setShow] = useState(false);
  const [specificationType, setSpecificationType] =
    React.useState("specification");
  const [editorContent, setEditorContent] = useState<{
    channels: string[];
    dependencies: string[];
    variables: Record<string, string>;
  }>({ channels: [], dependencies: [], variables: {} });
  const [editorContentLockfile, setEditorContentLockfile] = useState<any>({});

  const buttonStyles = getStylesForStyleType(
    { padding: "5px 60px" },
    { padding: "5px 48px" }
  );

  const onUpdateSpecificationType = (event: SelectChangeEvent) => {
    setSpecificationType(event.target.value as string);
  };

  const onUpdateChannels = useCallback((channels: string[]) => {
    dispatch(channelsChanged(channels));
  }, []);

  const onUpdateEditor = ({
    channels,
    dependencies,
    variables
  }: {
    channels: string[];
    dependencies: string[];
    variables: Record<string, string>;
  }) => {
    const code = { channels, dependencies, variables };

    // Note: the [null] checks are due to empty lists in the pretty-printed case
    // of formatCode
    if (
      !channels ||
      channels.length === 0 ||
      (channels.length === 1 && channels[0] === null)
    ) {
      code.channels = [];
    }

    if (
      !dependencies ||
      dependencies.length === 0 ||
      (dependencies.length === 1 && dependencies[0] === null)
    ) {
      code.dependencies = [];
    }

    if (!variables || Object.keys(variables).length === 0) {
      code.variables = {};
    }

    setEditorContent(code);
  };

  const onUpdateEditorLockfile = (lockfile: any) => {
    setEditorContentLockfile(lockfile);
  };

  const onToggleEditorView = (value: boolean) => {
    if (show) {
      if (specificationType === "specification") {
        dispatch(
          editorCodeUpdated({
            channels: editorContent.channels,
            dependencies: editorContent.dependencies,
            variables: editorContent.variables
          })
        );
      }
      // Do nothing when specificationType === lockfile
    } else {
      setEditorContent({
        dependencies: requestedPackages,
        variables: environmentVariables,
        channels
      });
    }

    setShow(value);
  };

  const formatCode = (
    channels: string[],
    dependencies: string[],
    variables: Record<string, string>
  ) => {
    if (channels.length === 0 && dependencies.length === 0) {
      // Note: these empty pretty-printed lists translate to [null]
      return "channels:\n  -\ndependencies:\n  -\n" + stringify({ variables });
    }
    return stringify({ channels, dependencies, variables });
  };

  const formatCodeLockfile = () => {
    return stringify({
      version: 1,
      metadata: {},
      package: []
    });
  };

  const handleSubmit = () => {
    let code;
    let is_lockfile;

    if (show) {
      if (specificationType === "specification") {
        code = editorContent;
        is_lockfile = false;
      } else {
        code = editorContentLockfile;
        is_lockfile = true;
      }
    } else {
      code = {
        dependencies: requestedPackages,
        variables: environmentVariables,
        channels
      };
      is_lockfile = false;
    }

    onCreateEnvironment(code, is_lockfile);
  };

  useEffect(() => {
    return () => {
      dispatch(environmentCreateStateCleared());
    };
  }, []);

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
              <Select
                value={specificationType}
                onChange={onUpdateSpecificationType}
                displayEmpty
              >
                <MenuItem value="specification">specification</MenuItem>
                <MenuItem value="lockfile">unified lockfile</MenuItem>
              </Select>
            </FormControl>
            {specificationType === "specification" ? (
              <CodeEditor
                code={formatCode(
                  channels,
                  requestedPackages,
                  environmentVariables
                )}
                onChangeEditor={onUpdateEditor}
              />
            ) : (
              <CodeEditor
                code={formatCodeLockfile()}
                onChangeEditor={onUpdateEditorLockfile}
              />
            )}
          </>
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <CreateEnvironmentPackages
                requestedPackages={requestedPackages}
              />
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
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
          <StyledButtonPrimary sx={buttonStyles} onClick={handleSubmit}>
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
