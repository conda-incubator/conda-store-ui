const artifactList = (
  currentBuildId: number | undefined,
  apiArtifactTypes: string[]
) => {
  if (!currentBuildId) {
    return [];
  }
  const artifact_map = {
    LOCKFILE: {
      name: "Link to lockfile",
      route: `api/v1/build/${currentBuildId}/lockfile/`
    },
    YAML: {
      name: "Link to yml file",
      route: `api/v1/build/${currentBuildId}/yaml/`
    },
    CONDA_PACK: {
      name: "Link to archive",
      route: `api/v1/build/${currentBuildId}/archive/`
    },
    LOGS: {
      name: `Conda Env ${currentBuildId} log`,
      route: `api/v1/build/${currentBuildId}/logs`
    },
    DOCKER_MANIFEST: {
      name: "Docker image",
      route: `${apiURL}api/v1/build/${currentBuildId}/docker/`
    }
  };

  return apiArtifactTypes.reduce(
    (acc, cur) => acc.concat(artifact_map[cur as keyof typeof artifactList]),
    []
  );
};

export default artifactList;
