import * as React from "react";

export const DeleteIconAlt = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={14}
      height={16}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.088 1h4.094M5.088 1h4.094M1 1.819h12.232M5.48 5.09v6.55M8.755 5.09v6.55"
        stroke="#3C4043"
        strokeLinecap="square"
      />
      <path
        clipRule="evenodd"
        d="M2.243 2.004v11.688c.072.595.338.892.798.892h8.188c.57.056.855-.242.855-.892V2.004H2.243z"
        stroke="#3C4043"
      />
    </svg>
  );
};
