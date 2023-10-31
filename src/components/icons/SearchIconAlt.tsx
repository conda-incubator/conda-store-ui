import * as React from "react";
import { useTheme } from "@mui/material/styles";

export const SearchIconAlt = (props: React.SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.09 12.64L17.53 17M7.77 15A7.06 7.06 0 10.66 7.94 7.08 7.08 0 007.77 15v0z"
        stroke={theme.palette.primary.main}
        strokeMiterlimit={10}
      />
    </svg>
  );
};
