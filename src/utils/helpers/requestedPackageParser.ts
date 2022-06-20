const requestedPackageParser = (requestedPackageName: string) => {
  const splittedPackageName = requestedPackageName.split(/(>=|<=|<|>|==)/g);

  const name = splittedPackageName[0];
  let version = "";
  let constraint = "latest";

  if (splittedPackageName.length > 1) {
    constraint = splittedPackageName[1];
    version = splittedPackageName[2];
  }

  return { name, version, constraint };
};

export default requestedPackageParser;
