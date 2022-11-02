import * as React from "react";

export const SquareIconAlt = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.42 1H1v11.42h11.42V1z"
        fill="#fff"
        stroke="#3C4043"
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </svg>
  );
};
