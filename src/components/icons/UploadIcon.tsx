import * as React from "react";
import { useTheme } from "@mui/material/styles";

export const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg
      width={12}
      height={16}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.998 10.817V1m0 .09L2.343 4.745M5.998 1.09l3.656 3.655M10.907 14.688H1"
        stroke={theme.palette.primary.main}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
