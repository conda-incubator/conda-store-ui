import { CondaSpecificationPip } from "../../common/models";

export const requestedPackageParser = (requestedPackageName: string) => {
  const splittedPackageName = requestedPackageName.split(/(>=|<=|<|>|==|=)/g);

  const name = splittedPackageName[0];
  let version = "";
  let constraint = "latest";

  if (splittedPackageName.length > 1) {
    constraint = splittedPackageName[1];
    version = splittedPackageName[2];
  }

  return { name, version, constraint };
};

export const requestedPackagesMapper = (
  dependencies: (string | CondaSpecificationPip)[]
) => {
  return dependencies.map(dep => {
    if (typeof dep === "string") {
      const { constraint, name, version } = requestedPackageParser(dep);
      if (constraint === "==") {
        return `${name}=${version}`;
      }
      return dep;
    }
    return dep;
  });
};
