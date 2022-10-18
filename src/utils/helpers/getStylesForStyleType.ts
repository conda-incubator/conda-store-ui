import { config } from "../../common/constants";

export const getStylesForStyleType = (
  grayscaleStyles: any,
  greenAccentStyles: any
) => {
  const isGrayscaleStyleType = config.styleType === "grayscale";

  return isGrayscaleStyleType ? grayscaleStyles : greenAccentStyles;
};
