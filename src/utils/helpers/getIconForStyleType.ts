import React from "react";
import { PrefContext } from "../../preferences";

export const getIconForStyleType = (
  grayscaleIcon: React.ReactNode,
  greenAccentIcon?: React.ReactNode
) => {
  if (!greenAccentIcon) {
    return grayscaleIcon;
  }
  const prefs = React.useContext(PrefContext);
  const isGrayscaleStyleType = prefs.styleType === "grayscale";

  return isGrayscaleStyleType ? grayscaleIcon : greenAccentIcon;
};
