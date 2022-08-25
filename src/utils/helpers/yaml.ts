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
      const key = Object.keys(element)[0];
      return `- ${key}:\n  - ${element[key][0]}\n`;
    }
    return `- ${element}\n`;
  });
  return `${name}:\n${formattingChannels.join("")}`;
};

export const defineYAMLStructure = (channels: any, packages: any) => {
  return `${yamlFormat("channels", channels)}${yamlFormat(
    "dependencies",
    packages
  )}`;
};
