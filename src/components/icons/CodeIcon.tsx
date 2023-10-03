import * as React from "react";
import { useTheme } from "@mui/material/styles";

export const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z"
        stroke={theme.palette.primary.contrastText}
      />
    </svg>
  );
};
