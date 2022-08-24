/**
 * @param name list name
 * @param array list options
 */
const yamlFormat = (name: string, array: any) => {
  if (!array.length) {
    return "";
  }
  const formattingChannels = array.map((element: any) => {
    if (typeof element === "object") {
      return;
    }
    return `\t- ${element}\n`;
  });
  return `${name}:\n${formattingChannels.join("")}`;
};

export const defineYAMLStructure = (channels: any, packages: any) => {
  return `${yamlFormat("channels", channels)}${yamlFormat(
    "dependencies",
    packages
  )}`;
};
