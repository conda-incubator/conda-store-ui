import * as React from "react";
import { useTheme } from "@mui/material/styles";

export const BookIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M8 4.3335V12.3335"
        stroke={theme.palette.secondary.main}
        strokeLinecap="round"
      />
      <path
        d="M13.667 4.3335V12.3335"
        stroke={theme.palette.secondary.main}
        strokeLinecap="round"
      />
      <path
        d="M2.33301 4.3335V12.3335"
        stroke={theme.palette.secondary.main}
        strokeLinecap="round"
      />
      <path
        d="M13.6667 12.3333C13.6667 12.3333 13 11 10.6667 11C8.33333 11 8 12.3333 8 12.3333"
        stroke={theme.palette.secondary.main}
        strokeLinecap="round"
      />
      <path
        d="M2.33333 12.3333C2.33333 12.3333 3 11 5.33333 11C7.66667 11 8 12.3333 8 12.3333"
        stroke={theme.palette.secondary.main}
        strokeLinecap="round"
      />
      <path
        d="M13.6667 4.33333C13.6667 4.33333 13 3 10.6667 3C8.33333 3 8 4.33333 8 4.33333"
        stroke={theme.palette.secondary.main}
        strokeLinecap="round"
      />
      <path
        d="M2.33333 4.33333C2.33333 4.33333 3 3 5.33333 3C7.66667 3 8 4.33333 8 4.33333"
        stroke={theme.palette.secondary.main}
        strokeLinecap="round"
      />
    </svg>
  );
};
