import * as React from "react";
import { useTheme } from "@mui/material/styles";

export const ChannelIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg
      width={12}
      height={15}
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: "10px", marginLeft: "5px" }}
      {...props}
    >
      <path
        d="M3.95 0H1.17A1.17 1.17 0 000 1.17v6.26C0 8.076.524 8.6 1.17 8.6h2.78a1.17 1.17 0 001.17-1.17V1.17A1.17 1.17 0 003.95 0zM3.95 10.07H1.17A1.17 1.17 0 000 11.24v1.96c0 .646.524 1.17 1.17 1.17h2.78a1.17 1.17 0 001.17-1.17v-1.96a1.17 1.17 0 00-1.17-1.17zM7.76 14.38h2.78a1.17 1.17 0 001.17-1.17V6.95a1.17 1.17 0 00-1.17-1.17H7.76a1.17 1.17 0 00-1.17 1.17v6.26c0 .646.524 1.17 1.17 1.17zM7.76 4.31h2.78a1.17 1.17 0 001.17-1.17V1.18A1.17 1.17 0 0010.54.01H7.76a1.17 1.17 0 00-1.17 1.17v1.96c0 .646.524 1.17 1.17 1.17z"
        fill={theme.palette.primary.main}
      />
    </svg>
  );
};
