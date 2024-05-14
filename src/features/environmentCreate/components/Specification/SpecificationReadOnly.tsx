import Box from "@mui/material/Box";
import React from "react";

import { BlockContainer } from "../../../../components";
import { RequestedPackageList } from "../../../../features/requestedPackages";
import { Dependencies, pageChanged } from "../../../../features/dependencies";
import { ChannelsList } from "../../../../features/channels";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

export const SpecificationReadOnly = () => {
  const { requestedPackages } = useAppSelector(
    state => state.requestedPackages
  );
  const { channels } = useAppSelector(state => state.channels);
  const { dependencies, size, count, page } = useAppSelector(
    state => state.dependencies
  );

  const dispatch = useAppDispatch();

  const hasMore = size * page <= count;

  return (
    <BlockContainer title="Specification">
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
        {/* TODO: make sure channels are never undefined in the state */}
        <ChannelsList channelList={channels ?? []} />
      </Box>
    </BlockContainer>
  );
};
