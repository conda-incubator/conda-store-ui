import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
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
  const { palette } = useTheme();

  const channelNameStyles = getStylesForStyleType(
    { color: "#4D4D4D" },
    { color: "#3C4043", fontSize: "14px" }
  );

  const icon = getIconForStyleType(
    <SquareIcon
      sx={{
        color: palette.primary.main,
        width: 10,
        height: 10,
        marginRight: "12px"
      }}
    />,
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
