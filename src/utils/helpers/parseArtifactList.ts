const artifacts = ["LOGS", "LOCKFILE", "CONDA_PACK", "YAML", "DOCKER_MANIFEST"];

export const parseArtifacts = (artifact_list: string[] | undefined) => {
  if (!artifact_list?.length) {
    return [];
  }
  return artifacts.filter(artifact => {
    return artifact_list.includes(artifact);
  });
};
