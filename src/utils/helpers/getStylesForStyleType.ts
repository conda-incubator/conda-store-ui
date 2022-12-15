import React from "react";
import { SxProps } from "@mui/material";
import { PrefContext } from "../../preferences";

export const getStylesForStyleType = (
  grayscaleStyles: SxProps,
  greenAccentStyles?: SxProps
) => {
  if (!greenAccentStyles) {
    return grayscaleStyles;
  }
  const prefs = React.useContext(PrefContext);
  const isGrayscaleStyleType = prefs.styleType === "grayscale";

  return isGrayscaleStyleType ? grayscaleStyles : greenAccentStyles;
};
