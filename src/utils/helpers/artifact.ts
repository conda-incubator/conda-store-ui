const artifactList = (
  currentBuildId: number | undefined,
  apiArtifactTypes: string[]
) => {
  if (!currentBuildId) {
    return [];
  }
  const artifact_map = {
    LOCKFILE: {
      name: "Show lockfile",
      route: `api/v1/build/${currentBuildId}/lockfile/`
    },
    YAML: {
      name: "Show yml file",
      route: `api/v1/build/${currentBuildId}/yaml/`
    },
    LOGS: {
      name: `Show Conda environment ${currentBuildId} log`,
      route: `api/v1/build/${currentBuildId}/logs/`
    },
    DOCKER_MANIFEST: {
      name: "Show Docker image",
      route: `api/v1/build/${currentBuildId}/docker/`
    },
    CONDA_PACK: {
      name: "Download archive",
      route: `api/v1/build/${currentBuildId}/archive/`
    }
  };

  return apiArtifactTypes.reduce(
    (acc, cur) => acc.concat(artifact_map[cur as keyof typeof artifactList]),
    []
  );
};

export default artifactList;
