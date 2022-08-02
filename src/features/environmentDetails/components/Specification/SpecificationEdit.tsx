import React from "react";
import Box from "@mui/material/Box";
import { ChannelsEdit } from "src/features/channels";
import { Dependencies, pageChanged } from "src/features/dependencies";
import { RequestedPackagesEdit } from "src/features/requestedPackages";
import { BlockContainer } from "src/components";
import { StyledButtonPrimary } from "src/styles";
import { useAppDispatch, useAppSelector } from "src/hooks";

export const SpecificationEdit = () => {
  const { requestedPackages } = useAppSelector(
    state => state.requestedPackages
  );
  const { channels } = useAppSelector(state => state.channels);
  const { dependencies, size, count, page } = useAppSelector(
    state => state.dependencies
  );

  const dispatch = useAppDispatch();

  const hasMore = !(size * page >= count);

  return (
    <BlockContainer title="Specification">
      <Box sx={{ padding: "13px 19px" }}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            marginBottom: "10px"
          }}
        >
          <StyledButtonPrimary sx={{ padding: "5px 60px" }}>
            Create
          </StyledButtonPrimary>
        </Box>
      </Box>
    </BlockContainer>
  );
};
