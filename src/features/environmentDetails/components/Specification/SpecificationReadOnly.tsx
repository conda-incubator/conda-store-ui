import React from "react";
import Box from "@mui/material/Box";
import { RequestedPackageList } from "src/features/requestedPackages";
import { Dependencies, pageChanged } from "src/features/dependencies";
import { ChannelsList } from "src/features/channels";
import { BlockContainer } from "src/components";
import { useAppDispatch, useAppSelector } from "src/hooks";

export const SpecificationReadOnly = () => {
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
          <RequestedPackageList packageList={requestedPackages} />
        </Box>
        <Box sx={{ marginBottom: "30px" }}>
          <Dependencies
            mode="read-only"
            dependencies={dependencies}
            hasMore={hasMore}
            next={() => dispatch(pageChanged(page + 1))}
          />
        </Box>
        <Box sx={{ margiBottom: "30px" }}>
          <ChannelsList channelList={channels} />
        </Box>
      </Box>
    </BlockContainer>
  );
};
