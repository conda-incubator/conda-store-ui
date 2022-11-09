import * as React from "react";

export const LoginIcon = ({ color }: any) => {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.621 21.243a10.621 10.621 0 100-21.243 10.621 10.621 0 000 21.243z"
        fill={color}
      />
      <path
        d="M10.927 8.788a2.518 2.518 0 10-2.518-2.511 2.512 2.512 0 002.518 2.511z"
        fill="#fff"
        stroke="#3C4043"
        strokeWidth={0.611}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.877 16.495H5.97c.138-3.057 2.34-5.428 4.956-5.428 2.61 0 4.812 2.371 4.95 5.428z"
        fill="#fff"
        stroke="#3C4043"
        strokeWidth={0.61}
      />
    </svg>
  );
};

export default LoginIcon;
