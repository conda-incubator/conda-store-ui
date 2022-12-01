import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { getIconForStyleType } from "../../../utils/helpers";
import { SquareIconAlt } from "../../../components";

interface IChannelProps {
  /**
   * @param channelName name of the channel
   */
  channelName: string;
}

export const Channel = ({ channelName }: IChannelProps) => {
  const icon = getIconForStyleType(
    <></>,
    <SquareIconAlt style={{ marginRight: "8px" }} />
  );

  return (
    <Box className="box" sx={{ display: "flex", alignItems: "center" }}>
      {icon}
      <Typography
        className="typography"
        sx={{ color: "#333", fontSize: "13px" }}
      >
        {channelName}
      </Typography>
    </Box>
  );
};
