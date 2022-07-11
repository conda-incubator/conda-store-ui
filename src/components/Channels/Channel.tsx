import React from "react";
import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

interface IChannelProps {
  channelName: string;
}

const Channel = ({ channelName }: IChannelProps) => {
  const { palette } = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <SquareIcon
        sx={{
          color: palette.primary.main,
          width: 10,
          height: 10,
          marginRight: "12px"
        }}
      />
      <Typography sx={{ color: "#4D4D4D" }}>{channelName}</Typography>
    </Box>
  );
};

export default Channel;
