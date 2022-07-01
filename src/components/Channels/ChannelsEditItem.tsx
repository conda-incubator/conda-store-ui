import React from "react";
import Box from "@mui/material/Box";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Typography from "@mui/material/Typography";

interface IChannelsEditItemProps {
  channelName: string;
}

const ChannelsEditItem = ({ channelName }: IChannelsEditItemProps) => {
  return (
    <Box
      sx={{
        width: "205px",
        height: "32px",
        backgroundColor: "#D9D9D9",
        border: "1px solid #000",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "10px",
          backgroundColor: "#7E7E7E",
          display: "inline-block",
          marginLeft: "-1px",
          borderRight: "1px solid #000"
        }}
      />
      <DragIndicatorIcon
        sx={{
          color: "#9B9A9A",
          marginRight: "10px"
        }}
      />
      <Typography sx={{ color: "#4D4D4D" }}>{channelName}</Typography>
    </Box>
  );
};

export default ChannelsEditItem;
