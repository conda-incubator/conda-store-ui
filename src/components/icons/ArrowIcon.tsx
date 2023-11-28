import * as React from "react";
import { useTheme } from "@mui/material/styles";

export const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg
      width={7}
      height={13}
      viewBox="0 0 7 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 12.82l6.29-6.41L0 0v12.82z"
        fill={theme.palette.secondary.dark}
      />
    </svg>
  );
};
