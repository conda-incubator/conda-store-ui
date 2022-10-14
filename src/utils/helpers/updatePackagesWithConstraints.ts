import { CondaSpecificationPip } from "../../common/models";
import { requestedPackageParser } from "./requestedPackageParser";

export const updatePackagesWithConstraints = (
  updatedConstraints: {
    [key: string]: { range: string; version: string };
  },
  requestedPackages: (string | CondaSpecificationPip)[]
) => {
  const updatedPackageList = requestedPackages.map(p => {
    if (typeof p === "object") {
      return p;
    }

    const { name } = requestedPackageParser(p as string);
    const updatedConstraint = updatedConstraints[name];

    if (updatedConstraint) {
      return `${name}${updatedConstraint.range}${updatedConstraint.version}`;
    }

    return p;
  });

  return updatedPackageList;
};
