const artifacts = ["LOGS", "LOCKFILE", "CONDA_PACK", "YAML", "DOCKER_MANIFEST"];

export const parseArtifacts = (artifact_list: string[] | undefined) => {
  return artifacts.filter(artifact => {
    return artifact_list?.includes(artifact);
  });
};
