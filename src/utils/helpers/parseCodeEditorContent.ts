import { parse } from "yaml";
import { CondaSpecification } from "../../common/models";

export default function parseCodeEditorContent(
  code: string
): Pick<CondaSpecification, "channels" | "dependencies" | "variables"> {
  let { channels, dependencies, variables } = parse(code) || {};

  // Note: the [null] checks are due to empty lists in the pretty-printed case
  // of formatCode
  if (
    !channels ||
    channels.length === 0 ||
    (channels.length === 1 && channels[0] === null)
  ) {
    channels = [];
  } else if (channels[channels.length - 1] === null) {
    channels.pop();
  }

  if (
    !dependencies ||
    dependencies.length === 0 ||
    (dependencies.length === 1 && dependencies[0] === null)
  ) {
    dependencies = [];
  } else if (dependencies[dependencies.length - 1] === null) {
    dependencies.pop();
  }

  if (!variables || Object.keys(variables).length === 0) {
    variables = {};
  }

  if (channels.some((c: unknown) => typeof c !== "string")) {
    throw new Error(
      "Found non-string member of channels while parsing Yaml spec"
    );
  }

  const nonStringDeps = dependencies.filter(
    (d: unknown) => typeof d !== "string"
  );
  if (nonStringDeps.length) {
    if (nonStringDeps.length > 1) {
      throw new Error(
        "Found more than one non-string member of dependencies while parsing Yaml spec"
      );
    }

    if (
      !Array.isArray(nonStringDeps[0].pip) ||
      nonStringDeps[0].pip.some((pipDep: unknown) => typeof pipDep !== "string")
    ) {
      throw new Error(
        "Found non-string, non-CondaSpecificationPip member of dependencies while parsing Yaml spec"
      );
    }
  }

  if (Object.keys(variables).some((k: unknown) => typeof k !== "string")) {
    throw new Error(
      "Found non-string key in variables while parsing Yaml spec"
    );
  }

  if (Object.values(variables).some((v: unknown) => typeof v !== "string")) {
    throw new Error(
      "Found non-string value in variables while parsing Yaml spec"
    );
  }

  return { channels, dependencies, variables };
}
