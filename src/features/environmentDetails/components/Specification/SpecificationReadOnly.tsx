import React from "react";
import Box from "@mui/material/Box";
import { RequestedPackageList } from "../../../../features/requestedPackages";
import { Dependencies, pageChanged } from "../../../../features/dependencies";
import { ChannelsList } from "../../../../features/channels";
import { BlockContainer } from "../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { ArtifactItem } from "../../../artifacts";

interface ISpecificationReadOnly {
  isFromLockfile?: boolean;
  lockfileUrl?: string;
}

export const SpecificationReadOnly = ({
  isFromLockfile,
  lockfileUrl
}: ISpecificationReadOnly) => {
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
      {!isFromLockfile && (
        <Box sx={{ marginBottom: "30px" }}>
          <RequestedPackageList packageList={requestedPackages} />
        </Box>
      )}
      <Box sx={{ marginBottom: "30px" }}>
        {isFromLockfile && lockfileUrl && (
          <Box
            sx={{
              display: "flex",
              fontFamily: "fontFamily",
              marginBottom: "30px"
            }}
          >
            <ArtifactItem artifact={{ name: "Lockfile", route: lockfileUrl }} />
          </Box>
        )}
        <Dependencies
          mode="read-only"
          dependencies={dependencies}
          hasMore={hasMore}
          next={() => dispatch(pageChanged(page + 1))}
        />
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
        <ChannelsList channelList={channels} />
      </Box>
    </BlockContainer>
  );
};
