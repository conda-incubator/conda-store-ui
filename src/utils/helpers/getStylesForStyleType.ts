import { SxProps } from "@mui/material";
import { config } from "../../common/constants";

export const getStylesForStyleType = (
  grayscaleStyles: SxProps,
  greenAccentStyles: SxProps
) => {
  const isGrayscaleStyleType = config.styleType === "grayscale";

  return isGrayscaleStyleType ? grayscaleStyles : greenAccentStyles;
};
