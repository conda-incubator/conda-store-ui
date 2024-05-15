import React, { useCallback, useEffect, useState } from "react";
import { DropzoneArea } from "mui-file-dropzone";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
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

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  id: string;
  "aria-labelledby": string;
}

function CustomTabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const SpecificationCreate = ({ onCreateEnvironment }: any) => {
  const dispatch = useAppDispatch();
  const { channels, requestedPackages, environmentVariables } = useAppSelector(
    state => state.environmentCreate
  );
  const [show, setShow] = useState(false);
  const [editorContent, setEditorContent] = useState<{
    channels: string[];
    dependencies: string[];
    variables: Record<string, string>;
  }>({ channels: [], dependencies: [], variables: {} });

  const buttonStyles = getStylesForStyleType(
    { padding: "5px 60px" },
    { padding: "5px 48px" }
  );

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

  const onToggleEditorView = (value: boolean) => {
    if (show) {
      dispatch(
        editorCodeUpdated({
          channels: editorContent.channels,
          dependencies: editorContent.dependencies,
          variables: editorContent.variables
        })
      );
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

  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleSubmit = async () => {
    if (tabIndex === 0) {
      const code = show
        ? editorContent
        : {
            dependencies: requestedPackages,
            variables: environmentVariables,
            channels
          };

      onCreateEnvironment(code);
    } else if (files.length) {
      // tabIndex = 1
      const text = await files[0].text();
      onCreateEnvironment(text);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(environmentCreateStateCleared());
    };
  }, []);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={(_, tabIndex) => setTabIndex(tabIndex)}
          aria-label="Specification or Lockfile"
        >
          <Tab
            label="Specification"
            id="specification-tab"
            aria-controls="specification-tabpanel"
          />
          <Tab
            label="Lockfile"
            id="lockfile-tab"
            aria-controls="lockfile-tabpanel"
          />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={tabIndex}
        index={0}
        id="specifaction-tabpanel"
        aria-labelledby="specification-tab"
      >
        <BlockContainerEditMode
          title="Specification"
          onToggleEditMode={onToggleEditorView}
          isEditMode={show}
        >
          <Box>
            {show ? (
              <CodeEditor
                code={formatCode(
                  channels,
                  requestedPackages,
                  environmentVariables
                )}
                onChangeEditor={onUpdateEditor}
              />
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
          </Box>
        </BlockContainerEditMode>
      </CustomTabPanel>
      <CustomTabPanel
        value={tabIndex}
        index={1}
        id="lockfile-tabpanel"
        aria-labelledby="lockfile-tab"
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
      </CustomTabPanel>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "10px"
        }}
      >
        <StyledButtonPrimary
          sx={buttonStyles}
          onClick={handleSubmit}
          disabled={tabIndex === 1 && !files?.length}
        >
          Create
        </StyledButtonPrimary>
      </Box>
    </Box>
  );
};
