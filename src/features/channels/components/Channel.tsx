import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

interface IChannelProps {
  /**
   * @param channelName name of the channel
   */
  channelName: string;
}

export const Channel = ({ channelName }: IChannelProps) => {
  return (
    <Box className="box" sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        className="typography"
        sx={{ color: "#333", fontSize: "13px" }}
      >
        {channelName}
      </Typography>
    </Box>
  );
};
