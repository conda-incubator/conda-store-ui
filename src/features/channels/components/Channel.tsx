import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  getIconForStyleType,
  getStylesForStyleType
} from "../../../utils/helpers";
import { SquareIconAlt } from "../../../components";

interface IChannelProps {
  /**
   * @param channelName name of the channel
   */
  channelName: string;
}

export const Channel = ({ channelName }: IChannelProps) => {
  const channelNameStyles = getStylesForStyleType(
    { color: "#4D4D4D", fontSize: "14px" },
    { color: "#3C4043", fontSize: "14px" }
  );

  const icon = getIconForStyleType(
    <></>,
    <SquareIconAlt style={{ marginRight: "8px" }} />
  );

  return (
    <Box className="box" sx={{ display: "flex", alignItems: "center" }}>
      {icon}
      <Typography className="typography" sx={channelNameStyles}>
        {channelName}
      </Typography>
    </Box>
  );
};
