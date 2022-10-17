import { config } from "../../common/constants";

export const getStylesForType = (
  grayscaleStyles: any,
  greenAccentStyles: any
) => {
  const isGrayscaleStyleType = config.styleType === "grayscale";

  return isGrayscaleStyleType ? grayscaleStyles : greenAccentStyles;
};
