import React from "react";
import Box from "@mui/material/Box";
import { RequestedPackageList } from "src/features/requestedPackages";
import { Dependencies } from "src/features/dependencies";
import { ChannelsList } from "src/features/channels";

export const SpecificationReadOnly = () => {
  return (
    <Box>
      <RequestedPackageList packageList={[]} />
      <Dependencies mode="read-only" dependencies={[]} />
      <ChannelsList channelList={[]} />
    </Box>
  );
};
