import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from "react";
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
import { requestedPackageParser } from "../../../../utils/helpers";
import { installedVersionsGenerated } from "../../environmentDetailsSlice";

interface ISpecificationEdit {
  descriptionUpdated: boolean;
  onUpdateEnvironment: (specification: any) => void;
}
export const SpecificationEdit = ({
  descriptionUpdated,
  onUpdateEnvironment
}: ISpecificationEdit) => {
  const { channels } = useAppSelector(state => state.channels);
  const { requestedPackages, packageVersions } = useAppSelector(
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
  }, []);

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
    const versions: { [key: string]: string } = {};

    requestedPackages.forEach(p => {
      if (typeof p === "string") {
        const { name, version } = requestedPackageParser(p as string);

        if (version) {
          versions[name] = version;
        }

        if (packageVersions[name]) {
          versions[name] = packageVersions[name];
        }
      }
    });

    dispatch(installedVersionsGenerated(versions));

    return () => {
      dispatch(installedVersionsGenerated({}));
    };
  }, []);

  useEffect(() => {
    if (descriptionUpdated) {
      setEnvIsUpdated(true);
    }

    const isDifferentChannels =
      JSON.stringify(channels) !== stringifiedInitialChannels;
    const isDifferentPackages =
      JSON.stringify(requestedPackages) !== stringifiedInitialPackages;

    if (isDifferentChannels || isDifferentPackages) {
      setEnvIsUpdated(true);
    }
  }, [channels, requestedPackages, descriptionUpdated]);

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={onToggleEditorView}
      isEditMode={show}
    >
      <Box sx={{ padding: "13px 19px" }}>
        {show ? (
          <CodeEditor
            code={stringify({ channels, dependencies: requestedPackages })}
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
            onClick={onCancelEdition}
          >
            Cancel
          </StyledButtonPrimary>
          <StyledButtonPrimary
            sx={{ padding: "5px 60px" }}
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
