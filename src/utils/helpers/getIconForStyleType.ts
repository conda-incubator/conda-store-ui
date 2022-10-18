import { config } from "../../common/constants";

export const getIconForStyleType = (
  grayscaleIcon: any,
  greenAccentIcon: any
) => {
  const isGrayscaleStyleType = config.styleType === "grayscale";

  return isGrayscaleStyleType ? grayscaleIcon : greenAccentIcon;
};
