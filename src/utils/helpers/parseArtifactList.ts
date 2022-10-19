const artifacts = ["LOGS", "LOCKFILE", "CONDA_PACK", "YAML"];

export const parseArtifacts = (artifact_list: string[] | undefined) => {
  const filteredArray = artifacts.filter(artifact => {
    return artifact_list?.includes(artifact);
  });

  return filteredArray;
};
