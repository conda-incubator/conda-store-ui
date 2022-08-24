import React, { useState } from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit } from "src/features/channels";
import { Dependencies, pageChanged } from "src/features/dependencies";
import { RequestedPackagesEdit } from "src/features/requestedPackages";
import { BlockContainerEditMode } from "src/components";
import { StyledButtonPrimary } from "src/styles";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { CodeEditor } from "src/features/yamlEditor";
import { useAddEnvironmentMutation } from "src/features/yamlEditor/createEnvironmentApiSlice";
import { defineYAMLStructure } from "src/utils/helpers/yaml";

export const SpecificationEdit = () => {
  const { requestedPackages } = useAppSelector(
    state => state.requestedPackages
  );
  const { channels } = useAppSelector(state => state.channels);
  const { dependencies, size, count, page } = useAppSelector(
    state => state.dependencies
  );
  const [show, setShow] = useState(false);
  const [addEnvironment] = useAddEnvironmentMutation();
  const dispatch = useAppDispatch();
  const hasMore = size * page <= count;

  const code = {
    specification:
      "channels:\n- conda-forge\ndependencies:\n- python ==3.9\n- flask\n- pandas\n- pip:\n  - nothing\n- ipykernel\ndescription: test description\nname: testNewEnv\nprefix: null",
    namespace: "test-api"
  };

  const sendData = () => {
    addEnvironment(code);
  };

  return (
    <BlockContainerEditMode
      title="Specification"
      onToggleEditMode={setShow}
      isEditMode={show}
    >
      <Box sx={{ padding: "13px 19px" }}>
        {show ? (
          <CodeEditor code={defineYAMLStructure(channels, requestedPackages)} />
        ) : (
          <div>
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
              <ChannelsEdit channelsList={channels} />
            </Box>
          </div>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            marginBottom: "10px"
          }}
        >
          <StyledButtonPrimary sx={{ padding: "5px 60px" }} onClick={sendData}>
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainerEditMode>
  );
};
