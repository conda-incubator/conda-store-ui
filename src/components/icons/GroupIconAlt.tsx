import * as React from "react";

export const GroupIconAlt = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={27}
      height={22}
      viewBox="0 0 27 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.092 7.547a3.773 3.773 0 100-7.547 3.773 3.773 0 000 7.547z"
        fill="#9AA0A6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.757 21.614c0-.515-2.155-10.294-8.08-10.294-5.926 0-8.081 9.78-8.081 10.294 0 .515 16.16.515 16.16 0z"
        fill="#9AA0A6"
      />
      <g opacity={0.72} fill="#9AA0A6">
        <path d="M21.27 11.53a2.886 2.886 0 100-5.771 2.886 2.886 0 000 5.77z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.532 21.63c0-.361-1.374-7.215-5.155-7.215S16.22 21.27 16.22 21.63c0 .361 10.311.361 10.311 0z"
        />
      </g>
      <g opacity={0.72} fill="#9AA0A6">
        <path d="M5.05 11.53a2.886 2.886 0 100-5.771 2.886 2.886 0 000 5.77z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.312 21.63c0-.361-1.375-7.215-5.156-7.215C1.375 14.415 0 21.27 0 21.63c0 .361 10.312.361 10.312 0z"
        />
      </g>
    </svg>
  );
};
