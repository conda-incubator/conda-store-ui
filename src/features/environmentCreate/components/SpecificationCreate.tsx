import React, { useState } from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit } from "src/features/channels";
import { RequestedPackagesEdit } from "src/features/requestedPackages";
import { BlockContainerEditMode } from "src/components";
import { StyledButtonPrimary } from "src/styles";
import { useAppSelector } from "src/hooks";
import { CodeEditor } from "src/features/yamlEditor";
import { useCreateOrUpdateMutation } from "src/features/environmentDetails";
import { stringify } from "yaml";

export const SpecificationCreate = () => {
  const { newEnvironment } = useAppSelector(state => state.tabs);
  const [show, setShow] = useState(false);
  const [channels] = useState([]);
  const [requestedPackages] = useState([]);
  const [createOrUpdate] = useCreateOrUpdateMutation();

  const yamlCode = stringify({
    channels,
    dependencies: requestedPackages
  });

  const onUpdateEnvironment = () => {
    // TODO: Retrieve this info from inputs
    const description = "Updated description";
    const name = "environment-name";
    const namespace = newEnvironment?.namespace;

    const environmentInfo = {
      specification: `${yamlCode}\ndescription: ${description}\nname: ${name}\nprefix: null`,
      namespace
    };
    createOrUpdate(environmentInfo);
  };

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={setShow}
      isEditMode={show}
    >
      <Box sx={{ padding: "13px 19px" }}>
        {show ? (
          <CodeEditor code={yamlCode} onChangeEditor={() => ({})} />
        ) : (
          <>
            <Box sx={{ marginBottom: "30px" }}>
              <RequestedPackagesEdit packageList={requestedPackages} />
            </Box>
            <Box sx={{ margiBottom: "30px" }}>
              <ChannelsEdit channelsList={channels} />
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
          <StyledButtonPrimary
            sx={{ padding: "5px 60px" }}
            onClick={onUpdateEnvironment}
          >
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
