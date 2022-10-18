import { config } from "../../common/constants";

export const getIconForStyleType = (
  grayscaleIcon: React.ReactNode,
  greenAccentIcon: React.ReactNode
) => {
  const isGrayscaleStyleType = config.styleType === "grayscale";

  return isGrayscaleStyleType ? grayscaleIcon : greenAccentIcon;
};
