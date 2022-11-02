import { SxProps } from "@mui/material";
import { config } from "../../common/constants";

export const getStylesForStyleType = (
  grayscaleStyles: SxProps,
  greenAccentStyles?: SxProps
) => {
  if (!greenAccentStyles) {
    return grayscaleStyles;
  }
  const isGrayscaleStyleType = config.styleType === "grayscale";

  return isGrayscaleStyleType ? grayscaleStyles : greenAccentStyles;
};
