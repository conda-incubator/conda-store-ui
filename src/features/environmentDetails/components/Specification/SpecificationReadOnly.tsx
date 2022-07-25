import React from "react";
import Box from "@mui/material/Box";
import { RequestedPackageList } from "src/features/requestedPackages";
import { Dependencies } from "src/features/dependencies";
import { ChannelsList } from "src/features/channels";
import { BlockContainer } from "src/components";

export const SpecificationReadOnly = () => {
  return (
    <BlockContainer title="Specification">
      <Box sx={{ padding: "13px 19px" }}>
        <Box sx={{ marginBottom: "30px" }}>
          <RequestedPackageList packageList={[]} />
        </Box>
        <Box sx={{ marginBottom: "30px" }}>
          <Dependencies mode="read-only" dependencies={[]} />
        </Box>
        <Box sx={{ margiBottom: "30px" }}>
          <ChannelsList channelList={[]} />
        </Box>
      </Box>
    </BlockContainer>
  );
};
